<template>
  <div class="w-80 align-center justify-center">
  <h1 class="text-center">Admin manage : {{admin}}</h1>

  <table id="customers" class="mt-10">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, index) in allData" :key="index">
        
        <td>{{ value.name }}</td>
        <td>{{ value.email }}</td>
        <td>
            <v-col cols="auto">
              <v-btn :to="'/user/'+value.id+'/edit'" density="compact" class="mr-2" color="primary" icon="mdi-pencil"></v-btn>
              <v-btn :to="'/user/'+value.id+'/delete'" density="compact" class="mr-2" color="error" icon="mdi-delete"></v-btn>
              <v-btn :to="'/user/'+value.id" density="compact" color="success" icon="mdi-eye"></v-btn>
            </v-col>


        </td>
      </tr>

    </tbody>
  </table>
</div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data(){
return {
allData:[],
admin:'',
}
  },
  async mounted(){
    const token = Cookies.get('token');
// Set Authorization header with token
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'multipart/form-data',
};
const value =await axios.get(`/admin/${this.$route.params.id}`,{headers});
        if(value.status==200){
          console.log("data=>",value)
          this.admin=value.data.name
        }else{
          this.$router.push("/admin");
        }
        const result =await axios.get(`/admin/${this.$route.params.id}/user`,{headers});
        if(result.status==200){
          this.allData=result.data;
        }else{
          this.$router.push("/admin");
        }
    },
}
</script>

<style scoped>

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 90%;
  margin: auto;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) { background-color: #f2f2f2; }

#customers tr:hover { background-color: #ddd; }

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
</style>
