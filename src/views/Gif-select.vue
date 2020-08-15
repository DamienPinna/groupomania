<template>
   <div>
      <Navbar :showAllGif="true"></Navbar>
      <Gif/>
   </div>
   
</template>

<script>
   import Navbar from '../components/Navbar'
   import Gif from '../components/Gif.vue'

   export default {
      name: 'Add-gif',
      components: {
         Navbar,
         Gif
      }
   }
</script>