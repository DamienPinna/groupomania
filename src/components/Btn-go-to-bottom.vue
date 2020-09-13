<template>
   <div>
      <img fill="red" src="../assets/arrow-circle-down-solid.svg" alt="flèche vers le bas" @click="goToBottom" variant="info" class="btn-to-bottom">
   </div>
</template>

<script>
   export default {
      name: 'Btn-go-to-bottom',
      methods: {
         goToBottom() {
            window.scrollTo({
               top: document.documentElement.scrollHeight,
               left: 0,
               behavior: 'smooth'
            });
         }
      }
   }
</script>

<style scoped>
   .btn-to-bottom {
      position: fixed;
      bottom: 20px;
      left: 30px;
      width: 50px;
      cursor: pointer;
   }

   @media screen and (max-width: 550px) {
      .btn-to-bottom {
         display: none;
      }
   }
</style>