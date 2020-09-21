<template>
   <div>
      <Navbar-auth :isDisabledLogin="true" activeLogin="border-bottom border-dark font-weight-bold"></Navbar-auth>
      <Form-login/>
   </div>
</template>

<script>
   import NavbarAuth from '../components/Navbar-auth.vue';
   import FormLogin from '../components/Form-login.vue';

   export default {
      name: 'Login',
      components: {
         NavbarAuth,
         FormLogin
      }
   }
</script>
