<template>
   <div class="pb-5 main">
      <template v-for="publication in publications">
         <div :key="publication.postId" class="mx-auto pt-5 item">
            <header class="d-flex justify-content-between align-items-center">
               <h4>{{ publication.title }}</h4>
               <div>{{ publication.date}}</div>
            </header>
            <div>Publié par : {{ publication.login }}</div>
            <b-card no-body>
               <div class="mx-auto">
                  <b-card-img :src="publication.gifUrl" img-alt="Image animée"></b-card-img>
               </div>

               <template v-slot:footer>
                  <div class="d-flex justify-content-between">
                     <a href="/gif-select" class="card-link">Commenter</a>
                     <a href="#" class="card-link" v-if="userId === publication.userId ? true : false">Supprimer</a>
                  </div>
               </template>
            </b-card>
         </div>
      </template>

      <img fill="red" src="../assets/arrow-circle-up-solid.svg" alt="flèche vers le haut" @click="goToTop" variant="info" class="btn-to-top" v-if="showGoToTopButton">

   </div>
</template>

<script>
   import axios from 'axios';
   import { mapState } from 'vuex';

   export default {
      name: 'Main',
      data() {
         return {
            showGoToTopButton: false,
            publications: null
         }
      },
      computed: {
         ...mapState(['userId'])
      },
      methods: {
         goToTop() {
            window.scrollTo(0,0);
         },

         checkScroll() {
            if (window.scrollY > 500) this.showGoToTopButton = true;
            else this.showGoToTopButton = false; 
         },

         getAllPublications() {
            const tokenFromStorage = localStorage.getItem('token');

            axios.get('http://localhost:3000/api/publications', {
               headers: {'Authorization':'Bearer ' + tokenFromStorage}
            })
            .then(response => this.publications = response.data)
            .catch(error => console.error(error));
         }
      },
      mounted() {
         window.addEventListener('scroll', this.checkScroll);
         this.getAllPublications();
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
   
   .item {
      width: 300px;
      height: auto;
   }

   @media screen and (max-width: 550px) {
      .btn-to-top {
         display: none;
      }
   }
</style>
