<template>
   <div class="main">
      <div class="mx-auto py-5 item">
         <header class="d-flex justify-content-between align-items-center">
            <h4>{{ publication.title }}</h4>
         </header>
         <div class="d-flex justify-content-between align-items-center">
            <div>Publié par : {{ publication.login }}</div>
            <div>{{ publication.date }}</div>
         </div>

         <b-card no-body>
            <div class="mx-auto" v-if="publication.gifUrl">
               <b-card-img :src="publication.gifUrl" alt="Image animée"></b-card-img>
            </div>

            <b-list-group flush>
               <template v-for="comment in comments" >
                  <b-card :key="comment.commentId" v-if="comment">
                     <b-alert v-if="showInputToModifyComment === comment.commentId" :show="showErrorMessageModifyComment" variant="danger" class="text-center">{{ errorMessage }}</b-alert>
                     <b-card-title>Commenté le {{ comment.date }}</b-card-title>
                     <b-card-sub-title class="mb-2">Par {{ comment.login ? comment.login : "profil supprimé"}}</b-card-sub-title>

                     <b-card-text v-if="showInputToModifyComment !== comment.commentId">
                        {{ comment.content }}
                     </b-card-text>

                     <label class="sr-only" for="modifyComment">Champ pour modifier le commentaire</label>
                     <b-form-textarea id="modifyComment" v-if="showInputToModifyComment === comment.commentId" :placeholder="comment.content" v-model="updatingComment" rows="3" max-rows="5" class="mb-3"> 
                        {{ comment.content }}
                     </b-form-textarea>

                     <div class="d-flex justify-content-between" v-if="comment.userId === userId || role ==='admin'">
                        <b-button v-if="showInputToModifyComment !== comment.commentId" variant="secondary" @click="showInputforModification(comment.commentId)">Modifier</b-button>
                        <b-button v-if="showInputToModifyComment === comment.commentId" @click="modifyComment(comment.commentId)" variant="success" :disabled="updatingComment === ''">Valider</b-button>
                        <b-button v-if="showInputToModifyComment !== comment.commentId" variant="danger" @click="deleteComment(comment.commentId)">Supprimer</b-button>
                        <b-button v-if="showInputToModifyComment === comment.commentId" variant="danger" @click="cancelModifyComment">Annuler</b-button>
                     </div> 
                  </b-card>
               </template>
            </b-list-group>

            <b-card v-if="showInputToCreatedComment">
               <b-alert :show="showErrorMessageCreateComment" variant="danger" class="text-center">{{ errorMessage }}</b-alert>
               <label class="sr-only" for="addComment">Champ pour ajouter un nouveau commentaire</label>
               <b-form-textarea id="addComment" v-model="newComment" rows="3" max-rows="5">
                  <!-- Nouveau commentaire à ajouter -->
               </b-form-textarea>
            </b-card>

            <template v-slot:footer>
               <div class="d-flex justify-content-between">
                  <b-button v-if="!showInputToCreatedComment" variant="info" @click="showInputForCreate"><span class="text-black">Commenter</span></b-button>
                  <b-button v-if="showInputToCreatedComment" variant="success" @click="createComment" :disabled="newComment === ''">Valider</b-button>
                  <b-button v-if="showInputToCreatedComment" variant="danger" @click="cancelCreateComment">Annuler</b-button>
               </div>
            </template>
         </b-card>
      </div>
      <Btn-go-to-top/>
      <Btn-go-to-bottom :showBtnGoToBottom="comments.length > 6"></Btn-go-to-bottom>
   </div>
</template>

<script>
   import axios from 'axios';
   import { mapState } from 'vuex';
   import BtnGoToTop from '../components/Btn-go-to-top.vue';
   import BtnGoToBottom from '../components/Btn-go-to-bottom.vue';

   export default {
      name: 'Gif',
      components: {
         BtnGoToTop,
         BtnGoToBottom
      },
      data() {
         return {
            showErrorMessageModifyComment: false,
            showErrorMessageCreateComment: false,
            showInputToCreatedComment: false,
            showInputToModifyComment: -1,
            errorMessage: '',
            publication: Object,
            comments: Array,
            postId: Number,
            updatingComment: '',
            newComment: ''
         }
      },
      computed: {
         ...mapState(['userId', 'role', 'tokenFromStorage', 'regex', 'characterErrorMessage'])
      },
      methods: {
         getOnePublication(postId) {
            axios.get(`http://localhost:3000/api/publications/${postId}`, {
               headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
            })
            .then(response => this.publication = response.data[0])
            .catch(error => console.error(error.message));
         },

         getAllCommentsFromOnePublication(postId) {
            axios.get(`http://localhost:3000/api/comments/${postId}`, {
               headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
            })
            .then(response => this.comments = response.data)
            .catch(error => console.error(error.message));
         },
         
         showInputforModification(commentId) {
            this.showInputToModifyComment = commentId;
            this.showErrorMessageModifyComment = false;
            this.updatingComment = '';
         },

         modifyComment(commentId) {
            if (this.regex.test(this.updatingComment)) {
               this.errorMessage = this.characterErrorMessage;
               this.showErrorMessageModifyComment = true;
            } else if (this.updatingComment !== "") {
               const formData = { content: this.updatingComment };
               axios.put(`http://localhost:3000/api/comments/${commentId}`, formData, {
                  headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
               })
               .then(response => {
                  console.log(response.data);
                  this.showInputToModifyComment = -1;
                  this.showErrorMessageModifyComment = false;
                  this.updatingComment = '',
                  this.getAllCommentsFromOnePublication(this.postId);
               })
               .catch(error => {
                  console.error(error.message);
                  this.errorMessage = error.response.data.message;
                  this.showErrorMessageModifyComment = true;
               });
            } else {
               this.showInputToModifyComment = -1;
            }
         },

         goToBottom() {
            window.scrollTo({
               top: document.documentElement.scrollHeight,
               left: 0,
               behavior: 'smooth'
            });
         },

         showInputForCreate() {
            this.showInputToCreatedComment = true;
            setTimeout(this.goToBottom, 50);
         },

         createComment() {
            if (this.regex.test(this.newComment)) {
               this.errorMessage = this.characterErrorMessage;
               this.showErrorMessageCreateComment = true;
            } else {
               const formData = {
                  userId: this.userId,
                  postId: this.postId,
                  content: this.newComment
               };
               axios.post('http://localhost:3000/api/comments', formData, {
                  headers: {'Authorization': 'Bearer ' + this.tokenFromStorage}
               })
               .then(response => {
                  console.log(response.data);
                  this.showInputToCreatedComment = false;
                  this.showErrorMessageCreateComment = false;
                  this.newComment = '';
                  this.getAllCommentsFromOnePublication(this.postId);
               })
               .catch(error => {
                  console.error(error.message);
                  this.errorMessage = error.response.data.message;
                  this.showErrorMessageCreateComment = true;
               }); 
            }
         },

         cancelModifyComment() {
            this.showInputToModifyComment = -1;
         },

         cancelCreateComment() {
            this.showInputToCreatedComment = false;
            this.showErrorMessageCreateComment = false;
            this.newComment = '';
         },

         deleteComment(commentId) {
            axios.delete(`http://localhost:3000/api/comments/${commentId}`, {
               headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
            })
            .then(response => {
               console.log(response.data);
               this.getAllCommentsFromOnePublication(this.postId);
            })
            .catch(error => console.log(error.message));
         }
      },
      mounted() {
         const postId = window.location.pathname.substring(12);
         this.postId = postId;
         this.getOnePublication(postId);
         this.getAllCommentsFromOnePublication(postId);
      }
   }
</script>

<style scoped>
   .main {
      background-color: #d3dbdf;
      margin-top: 56px;
      min-height: 94vh;
   }
   
   .item {
      width: 300px;
      height: auto;
   }

   .card-title {
      font-size: 15px;
   }

   .text-black {
      color: #000;
   }

   @media screen and (max-width: 360px) {
      .item {
         width: 100%;
      }
   }
</style>
