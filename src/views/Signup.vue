<template>
   <div>
      <Navbar-auth :isDisabledSignup="true" activeSignup="border-bottom font-weight-bold"></Navbar-auth>
      <Form-signup/>
   </div>
</template>

<script>
   import NavbarAuth from '../components/Navbar-auth.vue';
   import FormSignup from '../components/Form-signup.vue';

   export default {
      name: 'Signup',
      components: {
         NavbarAuth,
         FormSignup
      }
   }
</script>
