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
import { ref } from 'vue';
import PlantCard from '../components/plant/PlantCard.vue';
import AddPlant from '../components/plant/AddPlant.vue';

const activatorProps = ref(false);
const toggleActivatorProps = () => (activatorProps.value = !activatorProps.value);
const setActivatorProps = (value) => (activatorProps.value = value);
</script>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
  data() {
    return {
      data: [],
    };
  },
  async mounted() {
    try {
      const token = Cookies.get('token');
      // Set Authorization header with token
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const result = await axios.get('/plant-admin', { headers });
      if (result.status === 200) {
        this.data = result.data;
      }
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  },
  methods: {
    newPlant(data) {
      this.data.push(data);
    },
  },
};
</script>
