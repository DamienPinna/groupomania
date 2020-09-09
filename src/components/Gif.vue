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
                     <b-card-sub-title class="mb-2">Par {{ comment.login }}</b-card-sub-title>

                     <b-card-text v-if="showInputToModifyComment !== comment.commentId">
                        {{ comment.content }}
                     </b-card-text>

                     <b-form-textarea v-if="showInputToModifyComment === comment.commentId" :placeholder="comment.content" v-model="updatingComment" rows="3" max-rows="5" class="mb-3"> 
                        {{ comment.content }}
                     </b-form-textarea>

                     <div class="d-flex justify-content-between" v-if="comment.userId === userId">
                        <b-button v-if="showInputToModifyComment !== comment.commentId" variant="secondary" size="sm" @click="showInputforModification(comment.commentId)">Modifier</b-button>
                        <b-button v-if="showInputToModifyComment === comment.commentId" @click="modifyComment(comment.commentId, updatingComment)" variant="success" size="sm">Valider</b-button>
                        <b-button variant="danger" size="sm">Supprimer</b-button>
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
      <img fill="red" src="../assets/arrow-circle-up-solid.svg" alt="flèche vers le haut" @click="goToTop" variant="info" class="btn-to-top" v-if="showGoToTopButton">
      <img fill="red" src="../assets/arrow-circle-down-solid.svg" alt="flèche vers le bas" @click="goToBottom" variant="info" class="btn-to-bottom" v-if="comments.length > 10">
   </div>
</template>

<script>
   import axios from 'axios';
   import { mapState } from 'vuex';

   export default {
      name: 'Gif',
      data() {
         return {
            showGoToTopButton : false,
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
         ...mapState(['userId', 'tokenFromStorage'])
      },
      methods: {
         goToTop() {
            window.scrollTo({
               top: 0,
               left: 0,
               behavior: 'smooth'
            });
         },

         goToBottom() {
            window.scrollTo({
               top: document.documentElement.scrollHeight,
               left: 0,
               behavior: 'smooth'
            });
         },

         checkScroll() {
            if (window.scrollY > 500) this.showGoToTopButton = true;
            else this.showGoToTopButton = false; 
         },

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
               this.getAllCommentsFromOnePublication(this.postId);
            })
            .catch(error => console.log(error)); 
         },

         cancelCreateComment() {
            this.showInputToCreatedComment = false;
         }
      },
      mounted() {
         window.addEventListener('scroll', this.checkScroll);
         const postId = window.location.pathname.substring(12);
         this.postId = postId;
         this.getOnePublication(postId);
         setTimeout(this.getAllCommentsFromOnePublication, 100, postId);
      },
      destroy() {
         window.removeEventListener('scroll', this.checkScroll);
      }
   }
</script>

<style scoped>
   .main {
      background-color: #d3dbdf;
      margin-top: 56px;
      min-height: 94vh;
   }

   .btn-to-top {
      position: fixed;
      bottom: 20px;
      right: 30px;
      width: 50px;
      cursor: pointer;
   }

   .btn-to-bottom {
      position: fixed;
      bottom: 20px;
      left: 30px;
      width: 50px;
      cursor: pointer;
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

   @media screen and (max-width: 550px) {
      .btn-to-top {
         display: none;
      }
      .btn-to-bottom {
         display: none;
      }
   }
</style>
