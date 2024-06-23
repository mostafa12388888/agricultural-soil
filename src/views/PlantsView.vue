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
  Add  Plant 
</v-btn>

    <PlantCard />
    <AddPlant :dialogs="activatorProps" @update:dialogs="setActivatorProps">
      <!-- You can add slot content here if needed -->
    </AddPlant>
</div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import PlantCard from '../components/plant/PlantCard.vue';
  import AddPlant from '../components/plant/AddPlant.vue';
  
  const activatorProps = ref(false);
  const toggleActivatorProps=()=>activatorProps.value=!activatorProps.value;
  const setActivatorProps=(value)=>activatorProps.value=value;
  </script>
  