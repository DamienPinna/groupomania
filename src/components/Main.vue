<template>
   <div class="pb-5 main">
      <template v-for="publication in publications">
         <div :key="publication.postId" class="mx-auto pt-5 item">
            <header>
               <h4 v-if="showInputTitle !== publication.postId">{{ publication.title }}</h4>
               <b-form inline v-if="showInputTitle === publication.postId">
                  <label class="sr-only" for="modifyPublication">titre</label>
                  <b-input id="modifyPublication" class="mb-2 mr-sm-2 mb-sm-0" :placeholder="publication.title" v-model="newTitle"></b-input>
                  <b-button variant="primary" @click="modifyPublication(publication.postId, newTitle)">Valider</b-button>
               </b-form>
            </header>
            <div class="d-flex justify-content-between align-items-center">
               <div>Publié par : {{ publication.login }}</div>
               <div>{{ publication.date }}</div>
            </div>
            
            <b-card no-body>
               <a @click="goToUniqueGif(publication.postId)" class="mx-auto pointer">
                  <b-card-img :src="publication.gifUrl" img-alt="Image animée"></b-card-img>
               </a>

               <template v-slot:footer>
                  <div class="d-flex justify-content-between">
                     <b-button variant="info" size="sm" @click="goToUniqueGif(publication.postId)">
                        Commentaires
                        <b-badge variant="light">{{publication.nbComments}} <span class="sr-only">Nombre de commentaire</span></b-badge>
                     </b-button>
                     
                     <b-dropdown v-if="userId === publication.userId || role === 'admin'" variant="info" size="sm" right>
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

   export default {
      name: 'Main',
      components: {
         BtnGoToTop,
         BtnGoToBottom
      },
      data() {
         return {
            showInputTitle: -1,
            publications: Array,
            newTitle: '',
         }
      },
      computed: {
         ...mapState(['userId', 'role', 'tokenFromStorage'])
      },
      methods: {
         getAllPublications() {
            axios.get('http://localhost:3000/api/publications', {
               headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
            })
            .then(response => this.publications = response.data)
            .catch(error => console.error(error));
         },

         showInputforModification(postId) {
            this.showInputTitle = postId;
         },

         modifyPublication(postId, newTitle) {
            if (newTitle !== "") {
               const formData = { title: newTitle };
               axios.put(`http://localhost:3000/api/publications/${postId}`, formData, {
                  headers: {'Authorization':'Bearer ' + this.tokenFromStorage}
               })
               .then(response => {
                  console.log(response.data);
                  this.showInputTitle = -1;
                  this.getAllPublications();
               })
               .catch(error => console.error(error));
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
            .catch(error => console.error(error));
         },

         goToUniqueGif(postId) {
            this.$router.push(`/gif-select/${postId}`);
         }
      },
      mounted() {
         this.getAllPublications();
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
</style>
