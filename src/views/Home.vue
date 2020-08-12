<template>
  <div>
      <Navbar showAddGif="true"></Navbar>
      <Main/>
  </div>
</template>

<script>
   import Navbar from '../components/Navbar.vue'
   import Main from '../components/Main.vue'

   export default {
      name: 'Home',
      components: {
         Navbar,
         Main
      }
   }
</script>
