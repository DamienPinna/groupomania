<template>
   <div>
      <Navbar-auth/>
      <Form-signup/>
   </div>
</template>

<script>
   import NavbarAuth from '../components/Navbar-auth.vue'
   import FormSignup from '../components/Form-signup.vue'

   export default {
      name: 'Home',
      components: {
         NavbarAuth,
         FormSignup
      }
   }
</script>