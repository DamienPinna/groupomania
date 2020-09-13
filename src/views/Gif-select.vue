<template>
   <div>
      <Navbar :showAllGif="true"></Navbar>
      <Gif/>
      <Btn-go-to-top/>
      <Btn-go-to-bottom/>
   </div>
   
</template>

<script>
   import Navbar from '../components/Navbar'
   import Gif from '../components/Gif.vue'
   import BtnGoToTop from '../components/Btn-go-to-top.vue'
   import BtnGoToBottom from '../components/Btn-go-to-bottom.vue'

   export default {
      name: 'Add-gif',
      components: {
         Navbar,
         Gif,
         BtnGoToTop,
         BtnGoToBottom
      }
   }
</script>