<template>
  <table id="customers" class="mt-10">
    <thead>
      <tr>
        <th v-if="admin">Photo</th>
        <th>Name</th>
        <th>Email</th>
        <th v-if="!admin">Admin added</th>
        <th v-if="admin">Phone</th>
        <th v-if="admin">Status</th>
        <th v-if="admin">Address</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, index) in allData" :key="index">
        <td v-if="admin">
          <img 
            width="90px" 
            :src="value.photo ? `${urlGlobal.URL}/agricultural/${value.photo}` : './download.jpeg'" 
            alt="Photo" 
          />
        </td>
        <td>{{ value.name }}</td>
        <td>{{ value.email }}</td>
        <td v-if="!admin">{{ value.admin?.name??"" }}</td>
        <td v-if="admin">{{ value.phone }}</td>
        <td v-if="admin">
          <p class="status delivered">{{ value.status }}</p>
        </td>
        <td v-if="admin">{{ value.address }}</td>
        <td>
          <v-col cols="auto" class="d-flex align-center">
            <v-btn 
              :to="admin ? `/admin/${value.id}/edit` : `/user/${value.id}/edit`" 
              density="compact" 
              class="mr-2" 
              color="primary" 
              icon="mdi-pencil"
              v-tooltip:button="'edit'"
            ></v-btn>
           
            <div class="pa-4 text-center">
              <v-dialog
                v-model="dialog[index]"
                max-width="600"
              >
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    density="compact" 
                    class="mr-2" 
                    color="error" 
                    icon="mdi-delete"  
                    v-tooltip:button="'delete'"  
                    v-bind="activatorProps"              
                    @click="openDialog(index)"
                    ></v-btn>
                </template>
          
                <v-card
                  prepend-icon="mdi-delete"
                  title="Delete"
                >
                <v-card-text>
                  <v-row dense>
                    <v-col class="text-center">
                      <span>Are you sure you want to delete <h1>{{ value.name }}?</h1></span>
                    </v-col>
                  </v-row>
                </v-card-text>
          
                  <v-card-actions>
                    <v-spacer></v-spacer>
          
                    <v-btn
                      text="Close"
                      variant="plain"
                      @click="closeDialog(index)"
                    ></v-btn>
          
                    <v-btn
                      @click="deleteItem(value.id, index)" 
                      color="primary"
                      text="Delete"
                      variant="tonal"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>

            <v-btn 
              :to="admin ? `/admin/${value.id}` : `/user/${value.id}`" 
              density="compact" 
              color="success" 
              icon="mdi-eye"
              v-tooltip:button="'show users'"
            ></v-btn>
          </v-col>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import axios from 'axios';
import { useUrlGlobal } from '../stores/urlStore';
import Cookies from 'js-cookie';
import { ref } from 'vue';

const props = defineProps({
  allData: {
    type: Array,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const urlGlobal = useUrlGlobal();
const dialog = ref([]);

const openDialog = (index) => {
  dialog.value[index] = true;
};

const closeDialog = (index) => {
  dialog.value[index] = false;
};

const deleteItem = async (id, index) => {
  const token = Cookies.get('token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    if (props.admin) {
      const result = await axios.delete(`admin/${id}`, { headers });
      if (result.status === 200) {
        const response = await axios.get(`admin`, { headers });
        props.allData.splice(index, 1);  // Remove the deleted item from the array
      }
    } else {
      const result = await axios.delete(`user/${id}`, { headers });
      if (result.status === 200) {
        const response = await axios.get(`user`, { headers });
        props.allData.splice(index, 1);  // Remove the deleted item from the array
      }
    }
    closeDialog(index);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};
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
