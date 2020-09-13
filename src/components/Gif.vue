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
               <b-card-img :src="publication.gifUrl" img-alt="Image animée"></b-card-img>
            </div>

            <b-list-group flush>
               <template v-for="comment in comments" >
                  <b-card :key="comment.commentId" v-if="comment">
                     <b-card-title>Commenté le {{ comment.date }}</b-card-title>
                     <b-card-sub-title class="mb-2">Par {{ comment.login ? comment.login : "profil supprimé"}}</b-card-sub-title>

                     <b-card-text v-if="showInputToModifyComment !== comment.commentId">
                        {{ comment.content }}
                     </b-card-text>

                     <b-form-textarea v-if="showInputToModifyComment === comment.commentId" :placeholder="comment.content" v-model="updatingComment" rows="3" max-rows="5" class="mb-3"> 
                        {{ comment.content }}
                     </b-form-textarea>

                     <div class="d-flex justify-content-between" v-if="comment.userId === userId || role ==='admin'">
                        <b-button v-if="showInputToModifyComment !== comment.commentId" variant="secondary" size="sm" @click="showInputforModification(comment.commentId)">Modifier</b-button>
                        <b-button v-if="showInputToModifyComment === comment.commentId" @click="modifyComment(comment.commentId, updatingComment)" variant="success" size="sm">Valider</b-button>
                        <b-button variant="danger" size="sm" @click="deleteComment(comment.commentId)">Supprimer</b-button>
                     </div> 
                  </b-card>
               </template>
            </b-list-group>

            <b-card v-if="showInputToCreatedComment">
               <b-form-textarea v-model="newComment" rows="3" max-rows="5">
                  <!-- Nouveau commentaire à ajouter -->
               </b-form-textarea>
            </b-card>

            <template v-slot:footer>
               <div class="d-flex justify-content-between">
                  <b-button v-if="!showInputToCreatedComment" variant="info" size="sm" @click="showInputForCreate">Commenter</b-button>
                  <b-button v-if="showInputToCreatedComment" variant="success" size="sm" @click="createComment">Valider</b-button>
                  <b-button v-if="showInputToCreatedComment" variant="danger" size="sm" @click="cancelCreateComment">Annuler</b-button>
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
            publication: Object,
            comments: Array,
            showInputToModifyComment: -1,
            showInputToCreatedComment: false,
            postId: Number,
            updatingComment: '',
            newComment: ''
         }
      },
      computed: {
         ...mapState(['userId', 'role', 'tokenFromStorage'])
      },
      methods: {
         getOnePublication(postId) {
            axios.get(`http://localhost:3000/api/publications/${postId}`, {
               headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
            })
            .then(response => this.publication = response.data[0])
            .catch(error => console.error(error));
         },

         getAllCommentsFromOnePublication(postId) {
            axios.get(`http://localhost:3000/api/comments/${postId}`, {
               headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
            })
            .then(response => this.comments = response.data)
            .catch(error => console.error(error));
         },
         
         showInputforModification(commentId) {
            this.showInputToModifyComment = commentId;
         },

         modifyComment(commentId, updatingComment) {
            if (updatingComment !== "") {
               const formData = { content: updatingComment };
               axios.put(`http://localhost:3000/api/comments/${commentId}`, formData, {
                  headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
               })
               .then(response => {
                  console.log(response.data);
                  this.showInputToModifyComment = -1;
                  this.getAllCommentsFromOnePublication(this.postId);
               })
               .catch(error => console.error(error));
            } else {
               this.showInputToModifyComment = -1;
            }
         },

         showInputForCreate() {
            this.showInputToCreatedComment = true;
            setTimeout(this.goToBottom, 50);
         },

         createComment() {
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
               this.newComment = '';
               this.getAllCommentsFromOnePublication(this.postId);
            })
            .catch(error => console.log(error)); 
         },

         cancelCreateComment() {
            this.showInputToCreatedComment = false;
         },

         deleteComment(commentId) {
            axios.delete(`http://localhost:3000/api/comments/${commentId}`, {
               headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
            })
            .then(response => {
               console.log(response.data);
               this.getAllCommentsFromOnePublication(this.postId);
            })
            .catch(error => console.log(error));
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

   @media screen and (max-width: 360px) {
      .item {
         width: 100%;
      }
   }
</style>
