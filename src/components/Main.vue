<template>
   <div class="pb-5 main">
      <b-container v-if="publications.length === 0 || showErrorNetwork" class="pt-5 text-center">
         <b-alert show variant="warning">{{ errorMessage }}</b-alert>
      </b-container>
      <template v-for="publication in publications">
         <div :key="publication.postId" class="mx-auto pt-5 item">
            <header>
               <h4 v-if="showInputTitle !== publication.postId">{{ publication.title }}</h4>
               <template v-if="showInputTitle === publication.postId">
                  <b-alert :show="showErrorMessage" variant="danger" class="text-center">{{ errorMessage }}</b-alert>
                  <b-form inline>
                     <label class="sr-only" for="modifyPublication">Titre de la publication</label>
                     <b-input id="modifyPublication" class="mb-2 mr-sm-2 mb-sm-0" :placeholder="publication.title" v-model="newTitle"></b-input>
                     <b-button variant="primary" @click="modifyPublication(publication.postId)"><span class="text-black">Valider</span></b-button>
                  </b-form>
               </template>
            </header>
            <div class="d-flex justify-content-between align-items-center">
               <div>Publié par : {{ publication.login }}</div>
               <div>{{ publication.date }}</div>
            </div>
            
            <b-card no-body>
               <a @click="goToUniqueGif(publication.postId)" class="mx-auto pointer">
                  <b-card-img :src="publication.gifUrl" alt="Image animée"></b-card-img>
               </a>

               <template v-slot:footer>
                  <div class="d-flex justify-content-between">
                     <b-button variant="info" @click="goToUniqueGif(publication.postId)">
                        <span class="text-black">Commentaires</span>
                        <b-badge variant="light">{{publication.nbComments}} <span class="sr-only">Nombre de commentaire</span></b-badge>
                     </b-button>
                     
                     <b-dropdown v-if="userId === publication.userId || role === 'admin'" variant="info" size="sm" aria-label="flèche vers le bas pour dérouler un menu afficher un bouton modifier et un boutton supprimer" right>
                        <b-dropdown-item @click="showInputforModification(publication.postId)">Modifier</b-dropdown-item>
                        <b-dropdown-item @click="deletePublication(publication.postId)">Supprimer</b-dropdown-item>
                     </b-dropdown>
                  </div>
               </template>
            </b-card>
         </div>
      </template>
      <Btn-go-to-top/>
      <Btn-go-to-bottom :showBtnGoToBottom="publications.length > 2"></Btn-go-to-bottom>
   </div>
</template>

<script>
   import axios from 'axios';
   import { mapState } from 'vuex';
   import BtnGoToTop from '../components/Btn-go-to-top.vue';
   import BtnGoToBottom from '../components/Btn-go-to-bottom.vue';
   import { bus } from '../main';

   export default {
      name: 'Main',
      components: {
         BtnGoToTop,
         BtnGoToBottom
      },
      data() {
         return {
            showErrorMessage: false,
            showErrorNetwork: false,
            showInputTitle: -1,
            errorMessage: '',
            publications: Array,
            newTitle: '',
            pseudonymForSearch: ''
         }
      },
      computed: {
         ...mapState(['userId', 'role', 'tokenFromStorage', 'regex', 'characterErrorMessage'])
      },
      methods: {
         getAllPublications() {
            axios.get('http://localhost:3000/api/publications', {
               headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
            })
            .then(response => {
               if (this.pseudonymForSearch !== '') { 
                  this.errorMessage = 'Pas de publications avec ce pseudonyme !';
                  this.publications = response.data.filter(publication => publication.login.toLowerCase() === this.pseudonymForSearch.toLowerCase());
               }
               else this.publications = response.data;
            })
            .catch(error => {
               console.error(error.message);
               this.errorMessage = error.response.data.message;
               this.showErrorNetwork = true;
            });
         },

         showInputforModification(postId) {
            this.showInputTitle = postId;
            this.showErrorMessage = false;
            this.newTitle = '';
         },

         modifyPublication(postId) {
            if (this.regex.test(this.newTitle)) {
               this.errorMessage = this.characterErrorMessage;
               this.showErrorMessage = true;
            } else if (this.newTitle !== "") {
               const formData = { title: this.newTitle };
               axios.put(`http://localhost:3000/api/publications/${postId}`, formData, {
                  headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
               })
               .then(response => {
                  console.log(response.data);
                  this.showInputTitle = -1;
                  this.newTitle = '',
                  this.showErrorMessage = false;
                  this.getAllPublications();
               })
               .catch(error => {
                  console.error(error.message);
                  this.errorMessage = error.response.data.message;
                  this.showErrorMessage = true;
               });
            } else {
               this.showInputTitle = -1;
            }
         },

         deletePublication(postId) {
            axios.delete(`http://localhost:3000/api/publications/${postId}`, {
               headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
            })
            .then(response => {
               console.log(response.data);
               this.getAllPublications();
            })
            .catch(error => console.error(error.message));
         },

         goToUniqueGif(postId) {
            this.$router.push(`/gif-select/${postId}`);
         }
      },
      mounted() {
         this.getAllPublications();
         bus.$on('filterByPseudonym', pseudonymForSearch => {
            this.pseudonymForSearch = pseudonymForSearch;
            this.getAllPublications();
         })
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

   .pointer {
      cursor: pointer;
   }

   .text-black {
      color: #000;
   }
</style>
