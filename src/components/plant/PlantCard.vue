<template>
  <div>
    <v-container class="bg-surface-variant">
      <v-row no-gutters>
        <v-col
          v-for="(plant, key) in plantData"
          :key="key"
          cols="12"
          sm="12"
          md="6"
          lg="4"
          align="center"
        >
          <v-card class="mx-auto mb-2 mr-2" max-width="400">
            <v-img
              class="align-end text-white"
              height="200"
              :src="plant.image ? `${urlGlobal.URL}/${plant.image}` : ''"
              cover
            >
              <v-card-title>{{ plant.name }}</v-card-title>
            </v-img>

            <v-card-text>
              <div class="d-flex justify-space-between align-content-space-between">
                <span>Water</span>
                <span>{{ plant.watering }} L</span>
              </div>
              <div class="d-flex justify-space-between align-content-space-between">
                <span>Temperature</span>
                <span>{{ plant.temperature }} C</span>
              </div>
              <div class="d-flex justify-space-between align-content-space-between">
                <span>Soil Humidity</span>
                <span>{{ plant.soil_Humidity }} %</span>
              </div>
              <div class="d-flex justify-space-between align-content-space-between">
                <span>Humidity</span>
                <span>{{ plant.humidity }} %</span>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="orange"
                icon
                @click="toggleActivatorProps(key)"
                v-tooltip:right="'Edit'"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <EditPlant @updatePlant="updateItem" :plant="plant" :index="key" :dialogs="activatorProps === key" @update:dialogs="setActivatorProps(key, $event)" />

              <div class="pa-4 text-center">
                <v-dialog v-model="dialog[key]" max-width="600">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                      color="error"
                      icon="mdi-delete"
                      v-tooltip:right="'delete'"
                      density="compact"
                      class="mr-2"
                      v-bind="activatorProps"
                      @click="openDialog(key)"
                    ></v-btn>
                  </template>

                  <v-card prepend-icon="mdi-delete" title="Delete">
                    <v-card-text>
                      <v-row dense>
                        <v-col class="text-center">
                          <span>Are you sure you want to delete <h1>{{ plant.name }}?</h1></span>
                        </v-col>
                      </v-row>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn text variant="plain" @click="closeDialog(key)">Close</v-btn>

                      <v-btn @click="deletePlant(plant.id, key)" color="error" text variant="tonal">Delete</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { useUrlGlobal } from "../../stores/urlStore.js";
import axios from "axios";
import EditPlant from "./EditPlant.vue";
import Cookies from "js-cookie";

export default {
  props: ["allData"],
  data() {
    return {
      dialog: {},
      urlGlobal: useUrlGlobal(),
      plantData: this.allData || [],
      activatorProps: null,
    };
  },
  components: {
    EditPlant,
  },
  watch: {
    allData(newData) {
      this.plantData = newData;
    },
  },
  methods: {
    updateItem(index,val) {
      this.plantData[index]=val
      // this.$set(this.plantData, index, val);
    },
    openDialog(key) {
      this.dialog[key] = true;
    },
    closeDialog(key) {
      this.dialog[key] = false;
    },
    async deletePlant(id, key) {
      const token = Cookies.get("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      try {
        const result = await axios.delete(`plant-admin/${id}`, { headers });
        if (result.status === 200) {
          const response = await axios.get(`plant-admin`, { headers });
          this.plantData = response.data; // Update the plantData with the new data
          this.closeDialog(key);
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },
    toggleActivatorProps(key) {
      this.activatorProps = key;
    },
    setActivatorProps(key, value) {
      if (value) {
        this.activatorProps = key;
      } else {
        this.activatorProps = null;
      }
    },
  },
};
</script>
