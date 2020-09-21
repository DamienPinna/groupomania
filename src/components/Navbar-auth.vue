<template>
  <div>
      <b-navbar toggleable="sm" type="light" variant="info">
         <b-navbar-brand>
            <img src="../assets/icon-left-font-monochrome-black.svg" class="d-inline-block align-top" alt="logo groupomania">
         </b-navbar-brand>

         <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

         <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
               <b-nav-item @click="goToSignupPage" :disabled="isDisabledSignup"><span class="mr-3 h6 text-black" :class="activeSignup">Inscription</span></b-nav-item>
               <b-nav-item @click="goToConnexionPage" :disabled="isDisabledLogin"><span class="h6 text-black" :class="activeLogin">Connexion</span></b-nav-item>
            </b-navbar-nav>
         </b-collapse>
      </b-navbar>
   </div>
</template>

<script>
   export default {
      name: 'Navbar-auth',
      props: {
         isDisabledSignup: {
            type: Boolean
         },
         isDisabledLogin: {
            type: Boolean
         },
         activeSignup: {
            type: String
         },
         activeLogin: {
            type: String
         }
      },

      methods: {
         goToSignupPage() {
            this.$router.push('/signup');
         },

         goToConnexionPage() {
            this.$router.push('/');
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

   .text-black {
      color: #000;
   }

   @media screen and (max-width: 1240px) {
      .navbar {
         padding: 8px 16px;
      }
   }
</style>
