<template>
  <div>
      <b-navbar toggleable="sm" type="dark" variant="info">
         <b-navbar-brand href="home">
            <img src="../assets/icon-left-font-monochrome-black.svg" class="d-inline-block align-top" alt="logo groupomania">
         </b-navbar-brand>

         <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

         <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
               <b-nav-item href="/signup" :disabled="isDisabledSignup"><span class="text-white mr-3">Inscription</span></b-nav-item>
               <b-nav-item href="/" :disabled="isDisabledLogin"><span class="text-white">Connexion</span></b-nav-item>
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