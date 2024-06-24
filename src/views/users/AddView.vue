<template>
  <v-form @submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            label="Name"
            :error-messages="v$.name.$error ? v$.name.$errors[0].$message : ''"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="email"
            label="E-mail"
            :error-messages="
              v$.email.$error ? v$.email.$errors[0].$message : ''"
            required
          ></v-text-field>
          <span v-if="emailError" class="error" style="color:red;">{{emailError}}</span>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            label="Password"
            :error-messages="v$.password.$error ? v$.password.$errors[0].$message : ''"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn type="submit">Submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
  
  <script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import axios from "axios";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      email: "",
      password: "",
      emailError:"",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(10) },
      email: { required, email },
      password: { required, minLength: minLength(6), maxLength: maxLength(25) },
    };
  },
  methods: {
    async submitForm() {
      const token = Cookies.get("token");

      // Set Authorization header with token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const result = await axios.post(
            "/user",
            {
              name: this.name,
              email: this.email,
              password: this.password,
            },
            { headers }
          );
          console.log("result.data.error.email=>", result.data.message);
          if (result.status == 201) this.$router.push("/users");
          else this.emailError = result.data.message;
        } catch (error) {
          console.log("Validation error:", error.response.data.message);

          if (error.response && error.response.status === 422) {
            // Server validation error handling
            console.log("Validation error:", error.response.data.message);
            this.emailError = error.response.data.message;
            
          }
        }
        // Proceed with form submission logic here
        console.log("Validation passed. Submitting form...");
      }
    },
  },
};
</script>
  
  <style scoped>
/* Add your custom styles here if needed */
</style>
  