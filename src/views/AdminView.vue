<template>
  <div class="ml-10 mr-10 mt-10">
    <v-btn color="primary" to="/admin/add">Add Admin</v-btn>
    
    <Table :allData="data" :admin="1"/>
  </div >
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
  const result=await axios.get("/admin",{headers})
  if(result.status==200){
    this.data=result.data;
    console.log("data=",result.data)
  }
}
}
</script>

