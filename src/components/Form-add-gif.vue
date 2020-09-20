<template>
   <b-container>
      <h1 class="text-center mb-4 pt-4">Ajouter un Gif</h1>

      <b-alert :show="showErrorMessage" :variant="colorErrorMessage" class="text-center">{{ errorMessage }}</b-alert>
      <b-form @submit.prevent="onSubmit()" @reset.prevent="onReset">
         <b-form-group label="Titre :" label-for="title">
            <b-form-input id="title" v-model="form.title" required></b-form-input>
         </b-form-group>

         <b-form-group label="Gif :" label-for="gif">
            <b-form-file accept=".gif" id="gif" v-model="form.file" placeholder="Choisissez un fichier ou déposez-le ici..." drop-placeholder="Déposer le fichier ici..." required></b-form-file>
            <div class="mt-3">Fichier sélectionné : {{ form.file ? form.file.name : '' }}</div>
         </b-form-group>

         <b-button class="mr-2" type="submit" variant="info" :disabled="form.title === '' || form.file === null">Ajouter</b-button>
         <b-button type="reset" variant="danger" :disabled="form.title === '' && form.file === null">Effacer</b-button>
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
            showErrorMessage: false,
            errorMessage: '',
            colorErrorMessage: '',
            form: {
               title: '',
               file: null
            }
         }
      },
      computed: {
         ...mapState(['userId', 'tokenFromStorage', 'regex'])
      },
      methods: {
         onSubmit() {
            if (this.regex.test(this.form.title)) {
               this.errorMessage = 'Les caractères < " & et > ne sont pas autorisés.';
               this.colorErrorMessage = 'danger';
               this.showErrorMessage = true;
            } else {
               const formData = new FormData();
               formData.append('title', this.form.title);
               formData.append('image', this.form.file);
               formData.append('userId', this.userId);

               axios.post('http://localhost:3000/api/publications', formData, {
                  headers: {
                     'Authorization': 'Bearer ' + this.tokenFromStorage,
                     'content-type': 'multipart/form-data',
                  }
               })
               .then(response => {
                  console.log(response.data);
                  this.$router.push('/home');
               })
               .catch(error => {
                  console.error(error.message);
                  this.errorMessage = error.response.data.message;
                  this.colorErrorMessage = 'warning';
                  this.showErrorMessage = true;
               })
            }
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
