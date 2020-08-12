<template>
   <div>
      <Navbar showAllGif="true"></Navbar>
      <Form-add-gif/>
   </div>
   
</template>

<script>
   import Navbar from '../components/Navbar'
   import FormAddGif from '../components/Form-add-gif.vue'

   export default {
      name: 'Add-gif',
      components: {
         Navbar,
         FormAddGif
      }
   }
</script>
