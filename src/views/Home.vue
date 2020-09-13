<template>
  <div>
      <Navbar :showAddGif="true"></Navbar>
      <Main/>
      <Btn-go-to-top/>
  </div>
</template>

<script>
   import Navbar from '../components/Navbar.vue'
   import Main from '../components/Main.vue'
   import BtnGoToTop from '../components/Btn-go-to-top.vue'

   export default {
      name: 'Home',
      components: {
         Navbar,
         Main,
         BtnGoToTop
      },
   }
</script>
