<template>
   <div>
      <Navbar-auth/>
      <Form-login/>
   </div>
</template>

<script>
   import NavbarAuth from '../components/Navbar-auth.vue'
   import FormLogin from '../components/Form-login.vue'

   export default {
      name: 'Home',
      components: {
         NavbarAuth,
         FormLogin
      }
   }
</script>