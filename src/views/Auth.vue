<template>
   <div>
      <Navbar-auth/>
      <Form-auth/>
   </div>
</template>

<script>
   import NavbarAuth from '../components/Navbar-auth.vue'
   import FormAuth from '../components/Form-auth.vue'

   export default {
      name: 'Home',
      components: {
         NavbarAuth,
         FormAuth
      }
   }
</script>