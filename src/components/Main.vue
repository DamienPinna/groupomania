<template>
   <div class="pb-5 main">
      <div class="mx-auto pt-5 item">
         <header class="d-flex justify-content-between align-items-center">
            <h4>Titre</h4>
            <div>10/10/2020</div>
         </header>
         <div>Publié par : Damien</div>
         <b-card no-body>
            <div class="mx-auto">
               <b-card-img src="https://placekitten.com/300/300" img-alt="Image animée"></b-card-img>
            </div>

            <template v-slot:footer>
               <div class="d-flex justify-content-between">
                  <a href="/gif-select" class="card-link">Commenter</a>
                  <a href="#" class="card-link">Supprimer</a>
               </div>
            </template>
         </b-card>
      </div>

      <div class="mx-auto pt-5 item">
         <header class="d-flex justify-content-between align-items-center">
            <h4>Titre</h4>
            <div>10/10/2020</div>
         </header>
         <div>Publié par : Stéphanie</div>
         <b-card no-body>
            <div class="mx-auto">
               <b-card-img src="https://placekitten.com/100/300" img-alt="Image animée"></b-card-img>
            </div>

            <template v-slot:footer>
               <div class="d-flex justify-content-between">
                  <a href="/gif-select" class="card-link">Commenter</a>
                  <a href="#" class="card-link">Supprimer</a>
               </div>
            </template>
         </b-card>
      </div>

      <div class="mx-auto pt-5 item">
         <header class="d-flex justify-content-between align-items-center">
            <h4>Titre</h4>
            <div>10/10/2020</div>
         </header>
         <div>Publié par : Antoine</div>
         <b-card no-body>
            <div class="mx-auto">
               <b-card-img src="https://placekitten.com/200/300" img-alt="Image animée"></b-card-img>
            </div>

            <template v-slot:footer>
               <div class="d-flex justify-content-between">
                  <a href="/gif-select" class="card-link">Commenter</a>
                  <a href="#" class="card-link">Supprimer</a>
               </div>
            </template>
         </b-card>
      </div>

      <div class="mx-auto pt-5 item">
         <header class="d-flex justify-content-between align-items-center">
            <h4>Titre</h4>
            <div>10/10/2020</div>
         </header>
         <div>Publié par : Damien</div>
         <b-card no-body>
            <div class="mx-auto">
               <b-card-img src="https://placekitten.com/300/300" img-alt="Image animée"></b-card-img>
            </div>

            <template v-slot:footer>
               <div class="d-flex justify-content-between">
                  <a href="/gif-select" class="card-link">Commenter</a>
                  <a href="#" class="card-link">Supprimer</a>
               </div>
            </template>
         </b-card>
      </div>

      <div class="mx-auto pt-5 item">
         <header class="d-flex justify-content-between align-items-center">
            <h4>Titre</h4>
            <div>10/10/2020</div>
         </header>
         <div>Publié par : Damien</div>
         <b-card no-body>
            <div class="mx-auto">
               <b-card-img src="https://placekitten.com/300/300" img-alt="Image animée"></b-card-img>
            </div>

            <template v-slot:footer>
               <div class="d-flex justify-content-between">
                  <a href="/gif-select" class="card-link">Commenter</a>
                  <a href="#" class="card-link">Supprimer</a>
               </div>
            </template>
         </b-card>
      </div>

      <!-- <b-button @click="goToTop" variant="info" class="btn-to-top" v-if="showGoToTopButton">Top</b-button> -->
      <img fill="red" src="../assets/arrow-circle-up-solid.svg" alt="flèche vers le haut" @click="goToTop" variant="info" class="btn-to-top" v-if="showGoToTopButton">

   </div>
</template>

<script>
   export default {
      name: 'Main',
      data() {
         return {
            showGoToTopButton: false
         }
      },
      methods: {
         goToTop() {
            window.scrollTo(0,0);
         },
         checkScroll() {
            if (window.scrollY > 1000) {
               this.showGoToTopButton = true;
            } else {
               this.showGoToTopButton = false;
            }
         }
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
   .main {
      background-color: #d3dbdf;
      margin-top: 56px;
   }

   .btn-to-top {
      position: fixed;
      bottom: 20px;
      right: 30px;
      width: 50px;
   }
   
   .item {
      width: 300px;
      height: auto;
   }

   @media screen and (max-width: 550px) {
      .btn-to-top {
         display: none;
      }
   }
</style>
