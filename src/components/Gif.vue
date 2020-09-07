<template>
   <div class="main">
      <div class="mx-auto pt-5 item">
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

                     <b-card-text v-if="showToInputComment !== comment.commentId">
                        {{ comment.content }}
                     </b-card-text>

                     <b-form-textarea v-if="showToInputComment === comment.commentId" :placeholder="comment.content" v-model="newContent" rows="3" max-rows="5" class="mb-3"> 
                        {{ comment.content }}
                     </b-form-textarea>

                     <div class="d-flex justify-content-between" v-if="comment.userId === userId">
                        <b-button v-if="showToInputComment !== comment.commentId" variant="secondary" size="sm" @click="showInputforModification(comment.commentId)">Modifier</b-button>
                        <b-button v-if="showToInputComment === comment.commentId" @click="modifyComment(comment.commentId, newContent)" variant="success" size="sm">Valider</b-button>
                        <b-button variant="danger" size="sm">Supprimer</b-button>
                     </div> 
                  </b-card>
               </template>
            </b-list-group>

            <template v-slot:footer>
                  <div class="d-flex justify-content-between">
                     <b-button variant="info" size="sm">Commenter</b-button>
                  </div>
               </template>
         </b-card>
      </div>
   </div>
</template>

<script>
   import axios from 'axios';
   import { mapState } from 'vuex';

   export default {
      name: 'Gif',
      data() {
         return {
            publication: Object,
            comments: Array,
            showToInputComment: -1,
            postId: Number,
            newContent: ''
         }
      },
      computed: {
         ...mapState(['userId', 'tokenFromStorage'])
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
            this.showToInputComment = commentId;
         },

         modifyComment(commentId, newContent) {
            const formData = { content: newContent };
            axios.put(`http://localhost:3000/api/comments/${commentId}`, formData, {
               headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
            })
            .then(response => {
               console.log(response.data);
               this.showToInputComment = -1;
               this.getAllCommentsFromOnePublication(this.postId);
            })
            .catch(error => console.error(error));
         }
      },
      async mounted() {
         const postId = window.location.pathname.substring(12);
         this.postId = postId;
         await this.getOnePublication(postId);
         this.getAllCommentsFromOnePublication(postId);
      }
   }
</script>

<style scoped>
   .main {
      background-color: #d3dbdf;
      margin-top: 56px;;
      height: 94vh;
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
