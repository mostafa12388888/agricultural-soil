<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="email"
        :error-messages="v$.email.$error ? v$.email.$errors[0].$message : ''"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        v-model="password"
        :error-messages="v$.password.$error ? v$.password.$errors[0].$message : ''"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text v-if="errorMessages" color="error" class="text-medium-emphasis error text-caption">
          {{ errorMessages }}
        </v-card-text>
      </v-card>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        @click="submitLogin"
      >
        Log In
      </v-btn>
    </v-card>
  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      v$: useVuelidate(),
      visible: false,
      email: "",
      password: "",
      errorMessages: null,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    async submitLogin() {
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const result = await axios.post('/login-admin', {
            email: this.email,
            password: this.password,
          });
          console.log("result.data.OK=>",result.status)
          if (result.status==200) {
            // Successful login
            Cookies.set('token', result.data.data.AccessToken, {
              expires: 7, // Expires in 7 days
              secure: true, // Cookie will only be sent over HTTPS
              sameSite: 'strict', // Restricts cookie to same-site request
            });
            this.errorMessages = "";
            this.$router.push('/');
          } else {
            // Incorrect email or password
            this.errorMessages = "Email or password is incorrect.";
          }
        } catch (error) {
          console.error('Login error:', error);
          this.errorMessages = "An error occurred. Please try again.";
        }
      }
    }
  }
};
</script>
