<template>
   <div class="pb-5">
      <div class="mx-auto pt-5 item">
         <h4>Titre</h4>

         <b-card no-body>
            <div class="mx-auto">
               <b-card-img src="https://placekitten.com/300/300" img-alt="Image animée"></b-card-img>
            </div>

            <template v-slot:footer>
               <a href="#" class="card-link">Commenter</a>
               <a href="#" class="card-link">Supprimer</a>
            </template>
         </b-card>
      </div>

      <div class="mx-auto pt-5 item">
         <h4>Titre</h4>

         <b-card no-body>
            <div class="mx-auto">
               <b-card-img src="https://placekitten.com/100/300" img-alt="Image animée"></b-card-img>
            </div>

            <template v-slot:footer>
               <a href="#" class="card-link">Commenter</a>
               <a href="#" class="card-link">Supprimer</a>
            </template>
         </b-card>
      </div>

      <div class="mx-auto pt-5 item">
         <h4>Titre</h4>

         <b-card no-body>
            <div class="mx-auto">
               <b-card-img src="https://placekitten.com/200/300" img-alt="Image animée"></b-card-img>
            </div>

            <template v-slot:footer>
               <a href="#" class="card-link">Commenter</a>
               <a href="#" class="card-link">Supprimer</a>
            </template>
         </b-card>
      </div>
   </div>
</template>

<script>
   export default {
      name: 'Main'
   }
</script>

<style scoped>
   .item {
      width: 300px;
      height: auto;
   }

   @media screen and (max-width: 360px) {
      .item {
         width: 100%;
      }
   }
</style>