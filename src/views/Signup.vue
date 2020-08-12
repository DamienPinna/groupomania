<template>
   <div>
      <Navbar-auth isDisabledSignup='true' borderBottomSignup='border-bottom'></Navbar-auth>
      <Form-signup/>
   </div>
</template>

<script>
   import NavbarAuth from '../components/Navbar-auth.vue'
   import FormSignup from '../components/Form-signup.vue'

   export default {
      name: 'Signup',
      components: {
         NavbarAuth,
         FormSignup
      }
   }
</script>
