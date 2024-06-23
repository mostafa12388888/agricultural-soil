<template>
  <table id="customers" class="mt-10">
    <thead>
      <tr>
        <th v-if="admin">Photo</th>
        <th>Name</th>
        <th>Email</th>
        
        <th v-if="props.admin">phone</th>
        <th v-if="props.admin">Status</th>
        <th v-if="props.admin">Address</th>
        <th>Actions</th>
      
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, index) in props.allData" :key="index">
        <td v-if="props.admin">
          <!-- style="border-radius:30%"   -->
          <img width="90px" :src="!!value.photo?urlGlobal.URL + '/agricultural/' + value.photo: ('./download.jpeg')" alt="Photo" />
        </td>
        <td>{{ value.name }}</td>
        <td>{{ value.email }}</td>
        <td v-if="props.admin">{{ value.phone }}</td>

        <td v-if="props.admin">
          <p class="status delivered">{{ value.status }}</p>
        </td>
        <td v-if="props.admin">{{ value.address }}</td>
        <td>

        </td>
      </tr>

    </tbody>
  </table>
</template>

<script setup>
import { useUrlGlobal } from '../stores/urlStore'; // Ensure the path is correct

// Define props
const props = defineProps({
  allData: {
    type: Array,
    required: true,
  },
  admin:{
    type:Boolean,
    default:false,
  },
});

// Access the store
const urlGlobal = useUrlGlobal();
</script>

<style scoped>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
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
