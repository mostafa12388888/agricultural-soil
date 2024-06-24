<template>
  <div class="ml-10">
    <v-btn
      class="text-none font-weight-regular mb-10 mt-10"
      text
      color="blue"
      variant="tonal"
      v-bind="activatorProps"
      @click="toggleActivatorProps"
    >
      Add Plant
    </v-btn>

    <PlantCard :allData="data" />
    <AddPlant @plantAdd="newPlant" :dialogs="activatorProps" @update:dialogs="setActivatorProps">
      <!-- You can add slot content here if needed -->
    </AddPlant>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
import axios from 'axios';
import PlantCard from '../components/plant/PlantCard.vue';
import AddPlant from '../components/plant/AddPlant.vue';

const activatorProps = ref(false);
const data = ref([]);

const toggleActivatorProps = () => {
  activatorProps.value = !activatorProps.value;
};

const setActivatorProps = (value) => {
  activatorProps.value = value;
};

const newPlant = (plant) => {
  data.value.push(plant);
};

const fetchPlants = async () => {
  try {
    const token = Cookies.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const result = await axios.get('/plant-admin', { headers });
    if (result.status === 200) {
      data.value = result.data;
    }
  } catch (error) {
    console.error('Error fetching plants:', error);
  }
};

onMounted(fetchPlants);
</script>
