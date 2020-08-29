<template>
   <b-container class="mt-4">
      <h1 class="text-center mb-4">Connexion</h1>

      <b-alert :show="errorAuth" variant="danger" class="text-center">Pseudonyme et/ou mot de passe incorrect !</b-alert>
      <b-form @submit.prevent="login">
         <b-form-group label="Pseudonyme :" label-for="login">
            <b-form-input type="text" id="login" v-model="form.login" required></b-form-input>
         </b-form-group>
         <b-form-group label="Mot de passe :" label-for="password">
            <b-form-input type="password" id="password" v-model="form.password" required></b-form-input>
         </b-form-group>

         <b-button class="mr-2" type="submit" variant="info">Connexion</b-button>
      </b-form>
   </b-container>
</template>

<script>
   import axios from 'axios';

   export default {
      name: 'Form-login',
      data() {
         return {
            errorAuth: false,
            form: {
               login: '',
               password: ''
            }
         }
      },
      methods: {
         login() {
            axios.post('http://localhost:3000/api/auth/login', {
               login: this.form.login,
               password: this.form.password
            })
            .then(response => {
               localStorage.setItem('token', response.data.token);
               this.$router.push('/home');
            })
            .catch(error => {
               console.error(error.message);
               this.errorAuth = true;
            })
         }
      }
   }
</script>
