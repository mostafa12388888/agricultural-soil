<template>
  <v-form @submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col cols="12" justify="center" align="center">
          <h1 class="size-20">Add Admin</h1>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="name"
            label="Name"
            :error-messages="v$.name.$error ? v$.name.$errors[0].$message : ''"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="email"
            label="E-mail"
            :error-messages="
              v$.email.$error ? v$.email.$errors[0].$message : ''
            "
            required
          ></v-text-field>
          <span v-if="emailError" class="error" style="color:red;">{{emailError}}</span>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="password"
            label="Password"
            :error-messages="
              v$.password.$error ? v$.password.$errors[0].$message : ''
            "
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="address"
            label="Address"
            :error-messages="
              v$.address.$error ? v$.address.$errors[0].$message : ''
            "
            required
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-file-input
            v-model="photo"
            v-file-input
            accept="image/png, image/jpeg"
            label="Image URL"
            :error-messages="
              v$.photo.$error ? v$.photo.$errors[0].$message : ''
            "
            @change="handleFileUpload"
          ></v-file-input>
          <span v-if="fileErrors" class="error">{{ fileErrors }}</span>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="phone"
            label="Phone Number"
            :error-messages="
              v$.phone.$error ? v$.phone.$errors[0].$message : ''
            "
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
  import useVuelidate from '@vuelidate/core';
  import { required, email, minLength, maxLength, url, numeric } from '@vuelidate/validators';
import axios from 'axios';
import Cookies from 'js-cookie';

  export default {
    data() {
      return {
        v$: useVuelidate(),
        name: '',
        email: '',
        password: '',
      address: '',
      photo: null,
      phone: '',
      fileErrors:"",
      emailError:"",
      };
    },
    validations() {
      return {
        name: { required, minLength: minLength(10) },
        email: { required, email },
        password: { required, minLength: minLength(6), maxLength: maxLength(25) },
        address: {required,minLength:minLength(6)},
        photo:{required},
      phone: {required,minLength:minLength(6)|numeric},
      };
    },
    methods: {
       async submitForm() {
        const token = Cookies.get('token');

  // Set Authorization header with token
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };
        this.v$.$validate();
        if (!this.v$.$error) {
          try{
          // Proceed with form submission logic here
            const result =await axios.post("/admin",{
              name: this.name,
              email: this.email,
              password: this.password,
              address: this.address,
              photo: this.photo,
              phone: this.phone,
            },{headers});
            console.log("result.data.error.email=>",result.data.message)
            if(result.status==201)
            this.$router.push('/admin')

          }catch(error){
            console.log('Validation error:', error.response.data.message);

            if (error.response && error.response.status === 422) {
        this.emailError=error.response.data.message;

        }


      
        }
      }
    },
      handleFileUpload() {
      // Handle file upload validation or processing if needed
      if (this.photo && !['image/png', 'image/jpeg'].includes(this.photo.type)) {
        this.fileErrors = `The photo must be a file of type: png, jpg.`;
      }},

    }
  };
  </script>
  
  <style scoped>
/* Add your custom styles here if needed */
</style>
  