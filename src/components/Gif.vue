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
            <div class="mx-auto">
               <b-card-img :src="publication.gifUrl" img-alt="Image animée"></b-card-img>
            </div>

            <b-list-group flush>
               <b-card>
                  <!-- <b-card-title>Publié le 10/01/2020</b-card-title> -->
                  <b-card-title>Commenté le 10/01/2020</b-card-title>
                  <b-card-sub-title class="mb-2">Damien</b-card-sub-title>
                  <b-card-text>
                     Some quick example text to build on the card title and make up the bulk of the card's
                     content.
                  </b-card-text>

                  <div class="d-flex justify-content-between">
                     <a href="#" class="card-link">Modifier</a>
                     <b-link href="#" class="card-link">Supprimer</b-link>
                  </div> 
               </b-card>
            </b-list-group>

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
            postId: Number
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
         }
      },
      mounted() {
         const postId = window.location.pathname.substring(12);
         this.postId = postId;
         this.getOnePublication(postId);
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
