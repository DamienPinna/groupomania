<template>
   <div class="main">
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

            <b-list-group flush>
               <b-card>
                  <!-- <b-card-title>Publié le 10/01/2020</b-card-title> -->
                  <b-card-title>Commenté le 10/01/2020</b-card-title>
                  <b-card-sub-title class="mb-2">Damien</b-card-sub-title>
                  <b-card-text>
                     Some quick example text to build on the card title and make up the bulk of the card's
                     content.
                  </b-card-text>

                  <div class="d-flex justify-content-between">
                     <a href="#" class="card-link">Modifier</a>
                     <b-link href="#" class="card-link">Supprimer</b-link>
                  </div> 
               </b-card>
            </b-list-group>

         </b-card>
      </div>
   </div>
</template>

<script>
   export default {
      name: 'Gif'
   }
</script>

<style scoped>
   .main {
      background-color: #d3dbdf;
      margin-top: 56px;;
      height: 94vh;
   }
   
   .item {
      width: 300px;
      height: auto;
   }

   .card-title {
      font-size: 15px;
   }

   @media screen and (max-width: 360px) {
      .item {
         width: 100%;
      }
   }
</style>
