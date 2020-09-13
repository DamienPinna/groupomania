<template>
   <div>
      <img fill="red" src="../assets/arrow-circle-up-solid.svg" alt="flèche vers le haut" @click="goToTop" variant="info" class="btn-to-top" v-if="showGoToTopButton">
   </div>
</template>

<script>
   export default {
      name: 'Btn-go-to-top',
      data() {
         return {
            showGoToTopButton : false,
         }
      },
      methods: {
         goToTop() {
            window.scrollTo({
               top: 0,
               left: 0,
               behavior: 'smooth'
            });
         },

         checkScroll() {
            if (window.scrollY > 500) this.showGoToTopButton = true;
            else this.showGoToTopButton = false; 
         },
      },
      mounted() {
         window.addEventListener('scroll', this.checkScroll);
      },
      destroy() {
         window.removeEventListener('scroll', this.checkScroll);
      }
   }
</script>

<style scoped>
   .btn-to-top {
      position: fixed;
      bottom: 20px;
      right: 30px;
      width: 50px;
      cursor: pointer;
   }

   @media screen and (max-width: 550px) {
      .btn-to-top {
         display: none;
      }
   }
</style>