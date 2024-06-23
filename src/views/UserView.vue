<template>
    <div class="ml-10 mr-10 mt-10">
      <v-btn color="primary" :to="{ name: 'AddUser' }">Add User</v-btn>
      <Table :allData="data" />
  </div>
  </template>
  <script setup>
  import Table from '../components/Table.vue';
  import Cookies from 'js-cookie';
  import axios from 'axios';

</script>
<script>
export default {
  data(){
    return{
      data:[],
    }
  },
async mounted(){
  const token = Cookies.get('token');
  // Set Authorization header with token
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };
  const result=await axios.get("/user",{headers})
  if(result.status==200){
    this.data=result.data;
  }
}
}
</script>


  