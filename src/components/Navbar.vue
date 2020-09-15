<template>
  <div>
      <b-navbar toggleable="md" type="dark" variant="info" fixed="top">
         <b-navbar-brand>
            <img src="../assets/icon-left-font-monochrome-black.svg" class="d-inline-block align-top" alt="logo groupomania">
         </b-navbar-brand>

         <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

         <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
               <b-nav-item v-show="showAddGif" @click="goToAddGifPage"><span class="text-white">Ajouter un Gif</span></b-nav-item>
               <b-nav-item v-show="showAllGif" @click="goToHomePage"><span class="text-white">Voir tous les Gif</span></b-nav-item>
            </b-navbar-nav>
         
            <b-navbar-nav class="ml-auto">
               <b-nav-form>
                  <b-form-input size="sm" class="mr-sm-2" v-model="pseudonymForSearch"></b-form-input>
                  <b-button size="sm" class="my-2 my-sm-0" @click="filterByPseudonym">Chercher</b-button>
               </b-nav-form>

               <b-nav-item-dropdown right >
                  <template v-slot:button-content>
                     <span class="text-white">{{ login }}</span>
                  </template>
                  <b-dropdown-item @click="deleteUser">Supprimer profil</b-dropdown-item>
                  <b-dropdown-item @click="logout">Déconnexion</b-dropdown-item>
               </b-nav-item-dropdown>
            </b-navbar-nav>
         </b-collapse>
      </b-navbar>
   </div>
</template>

<script>
   import axios from 'axios';
   import { mapState } from 'vuex';
   import { bus } from '../main';

   export default {
      name: 'Navbar',
      data() {
         return {
            pseudonymForSearch: ''
         }
      },
      computed: {
         ...mapState(['login','userId'])
      },
      methods: {
         logout() {
            localStorage.removeItem('token');
            this.$router.push('/');
         },
         
         deleteUser() {
            axios.delete(`http://localhost:3000/api/auth/${this.userId}`)
            .then(() => {this.logout()})
            .catch(error => console.error(error));
         },

         goToHomePage() {
            this.$router.push('/home');
         },
   
         goToAddGifPage() {
            this.$router.push('/add-gif');
         },

         filterByPseudonym() {
            bus.$emit('filterByPseudonym', this.pseudonymForSearch);
         }
      },
      created() {
         this.$store.dispatch('defineUser');
      },
      props: {
         showAddGif: {
            type: Boolean
         },
         showAllGif: {
            type: Boolean
         }
      }
   }
</script>

<style scoped>
   img {
      width: 150px;
      height: auto;
   }

   .navbar {
      padding: 8px 10%;
   }

   .navbar-brand {
      display: flex;
      justify-content: center;
      align-content: center;
   }

   @media screen and (max-width: 1240px) {
      .navbar {
         padding: 8px 16px;
      }
   }
</style>
