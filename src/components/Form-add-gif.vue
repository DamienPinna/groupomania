<template>
   <b-container>
      <h1 class="text-center mb-4 pt-4">Ajouter un Gif</h1>

      <b-form @submit="onSubmit" @reset="onReset">
         <b-form-group label="Titre :" label-for="title">
            <b-form-input id="title" v-model="form.title" required></b-form-input>
         </b-form-group>

         <b-form-group label="Gif :" label-for="gif">
            <b-form-file accept=".gif" id="gif" v-model="form.file" placeholder="Choisissez un fichier ou déposez-le ici..." drop-placeholder="Déposer le ficier ici..." required></b-form-file>
            <div class="mt-3">Fichier sélectionné: {{ form.file ? form.file.name : '' }}</div>
         </b-form-group>

         <b-button class="mr-2" type="submit" variant="info">Ajouter</b-button>
         <b-button type="reset" variant="danger">Effacer</b-button>
      </b-form>
   </b-container>
</template>

<script>
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
      methods: {
         onSubmit(evt) {
            evt.preventDefault()
            console.log("Soumission du formulaire")
         },
         onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.title = ''
            this.form.file = null
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
               this.show = true
            })
         }
      }
   }
</script>

<style>
   .container {
      margin-top: 56px;
   }
</style>
