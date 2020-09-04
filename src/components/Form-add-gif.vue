<template>
   <b-container>
      <h1 class="text-center mb-4 pt-4">Ajouter un Gif</h1>

      <b-form @submit.prevent="onSubmit(form.title, form.file)" @reset.prevent="onReset">
         <b-form-group label="Titre :" label-for="title">
            <b-form-input id="title" v-model="form.title" required></b-form-input>
         </b-form-group>

         <b-form-group label="Gif :" label-for="gif">
            <b-form-file accept=".gif" id="gif" v-model="form.file" placeholder="Choisissez un fichier ou déposez-le ici..." drop-placeholder="Déposer le fichier ici..." required></b-form-file>
            <div class="mt-3">Fichier sélectionné : {{ form.file ? form.file.name : '' }}</div>
         </b-form-group>

         <b-button class="mr-2" type="submit" variant="info">Ajouter</b-button>
         <b-button type="reset" variant="danger">Effacer</b-button>
      </b-form>
   </b-container>
</template>

<script>
   import axios from 'axios';
   import { mapState } from 'vuex';

   export default {
      name: 'Form-add-gif',
      data() {
         return {
            form: {
               title: '',
               file: null
            }
         }
      },
      computed: {
         ...mapState(['userId', 'tokenFromStorage'])
      },
      methods: {
         onSubmit(title, file) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('image', file);
            formData.append('userId', this.userId);
            
            axios.post('http://localhost:3000/api/publications', formData, {
               headers: {
                  'Authorization': 'Bearer ' + this.tokenFromStorage,
                  'content-type': 'multipart/form-data'
               }
            })
            .then(response => {
               console.log(response);
               this.$router.push('/home');
            })
            .catch(error => console.error(error))
            console.log("Soumission du formulaire");
         },

         onReset() {
            // Reset our form values
            this.form.title = '';
            this.form.file = null;
         }
      }
   }
</script>

<style>
   .container {
      margin-top: 56px;
   }
</style>
