<template>
   <b-container class="mt-4">
      <h1 class="text-center mb-4">Authentification</h1>

      <b-form @submit="onSubmit">
         <b-form-group label="Pseudo :" label-for="pseudo">
            <b-form-input type="text" id="pseudo" v-model="form.pseudo" required></b-form-input>
         </b-form-group>
         <b-form-group label="Mot de passe :" label-for="password">
            <b-form-input type="password" id="password" v-model="form.password" required></b-form-input>
         </b-form-group>

         <b-button class="mr-2" type="submit" variant="info">Connexion</b-button>
      </b-form>
   </b-container>
</template>

<script>
   export default {
      name: 'Form-auth',
      data() {
         return {
            form: {
               pseudo: '',
               password: ''
            }
         }
      },
      methods: {
         onSubmit(evt) {
            evt.preventDefault()
            console.log("Soumission du formulaire")
         }
      }
   }
</script>
