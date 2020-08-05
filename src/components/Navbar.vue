<template>
  <div>
      <b-navbar toggleable="sm" type="dark" variant="info">
         <b-navbar-brand href="#" class="brand">
            <img src="../assets/icon-left-font-monochrome-black.svg" class="d-inline-block align-top" alt="logo groupomania">
         </b-navbar-brand>

         <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

         <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
               <b-nav-form>
                  <b-form-input size="sm" class="mr-sm-2"></b-form-input>
                  <b-button size="sm" class="my-2 my-sm-0" type="submit">Chercher</b-button>
               </b-nav-form>

               <b-nav-item-dropdown right>
                  <template v-slot:button-content>
                     <em>User</em>
                  </template>
                  <b-dropdown-item href="#">Profil</b-dropdown-item>
                  <b-dropdown-item href="#">Déconnexion</b-dropdown-item>
               </b-nav-item-dropdown>
            </b-navbar-nav>
         </b-collapse>
      </b-navbar>
   </div>
</template>

<script>
   export default {
      name: 'Navbar'
   }
</script>

<style scoped>
   img {
      width: 150px;
      height: auto;
   }

   .brand {
      display: flex;
      justify-content: center;
      align-content: center;
   }
</style>
