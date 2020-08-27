<template>
   <b-container class="mt-4">
      <h1 class="text-center mb-4">Inscription</h1>

      <b-form @submit.prevent="signup">
         <b-form-group label="login :" label-for="login">
            <b-form-input type="text" id="login" v-model="form.login" required></b-form-input>
         </b-form-group>
         <b-form-group label="Mot de passe :" label-for="password">
            <b-form-input type="password" id="password" v-model="form.password" required></b-form-input>
         </b-form-group>

         <b-button class="mr-2" type="submit" variant="info">Inscription</b-button>
      </b-form>
   </b-container>
</template>

<script>
   import axios from 'axios';

   export default {
      name: 'Form-signup',
      data() {
         return {
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
               window.location.href = "/home";
            })
            .catch(error => {
               console.error(error);
            })
         },

         signup() {
            axios.post('http://localhost:3000/api/auth/signup', {
               login: this.form.login,
               password: this.form.password
            })
            .then(() => {this.login()})
            .catch(error => {console.error(error)})
         }
      }
   }
</script>
