<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes.light.primary }"
  >
    <v-main>
      <v-container class="px-6 mt-n2" fluid>
        <v-row>
          <v-col cols="12" sm="4">
            <v-card
              color="#B49239"
              theme="dark"
              class="rounded-xl"
              height="150"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5 mt-10">
                    Employees
                    {{ dataValue ? dataValue.admin : "Loading..." }}
                  </v-card-title>
                  <v-card-subtitle>
                    Users
                    {{ dataValue ? dataValue.user : "Loading..." }}
                  </v-card-subtitle>
                </div>
                <v-img src="av.png" class="mr-4 mt-5" absolute></v-img>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card
              color="#425C5A"
              theme="dark"
              class="rounded-xl"
              height="150"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5 mt-10">
                    Default Plants
                    {{ dataValue ? dataValue.defaultPlant : "Loading..." }}
                  </v-card-title>
                  <v-card-subtitle>
                    Non-default Plants
                    {{ dataValue ? dataValue.notDefaultPlant : "Loading..." }}
                  </v-card-subtitle>
                </div>
                <v-img src="av.png" class="mr-4 mt-5" absolute></v-img>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card
              color="#425C5A"
              theme="dark"
              class="rounded-xl"
              height="150"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5 mt-10">
                    Total Plant
                  </v-card-title>
                  <v-card-subtitle>
                    {{ dataValue ? dataValue.TotalPlant : "Loading..." }}
                  </v-card-subtitle>
                </div>
                <v-img src="map.png" class="mr-4 mt-5" absolute></v-img>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="4" class="mt-4">
            <v-card class="m-auto" height="550px">
              <span>Plant Chart</span>
              <v-card-item class="ml-20" title="Plant Chart">
              <UserChart />

              </v-card-item>
              <v-card-text class="py-0"></v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" class="mt-4">
            <v-card class="mx-auto" height="550px">
              <v-card-item title="User Chart">
                <PlantCharts />
              </v-card-item>
            </v-card>
          </v-col>
          <!-- <v-col cols="12" sm="8" class="mt-n4">
            <v-card class="mx-auto">
              <v-card-item title="Last Trips">
              </v-card-item>
              <v-card-text class="py-0 mt-n4">
                <v-row align="center" no-gutters>
                  <v-col cols="12">
                    <v-list lines="two">
                      <v-list-item
                        v-for="folder in folders"
                        :key="folder.title"
                        :title="folder.title"
                        :subtitle="folder.subtitle"
                      >
                        <template v-slot:prepend>
                          <v-avatar>
                            <v-img :src="folder.img" alt="User Avatar"></v-img>
                          </v-avatar>
                        </template>
                        <template v-slot:append>
                          <v-btn
                            size="large"
                            color="#B49239"
                            icon="mdi mdi-airplane-off"
                          ></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col> -->
          <!-- <v-col cols="12" sm="4" class="mt-n4"> -->
            <!-- <v-card height="155px"> -->
              <!-- <v-card-item title="Bar Chart">
                <Bar class="mt-n4" />
              </v-card-item> -->
              <!-- <v-card-text class="py-0"></v-card-text> -->
            <!-- </v-card> -->
          <!-- </v-col> -->
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import axios from "axios";
import UserChart from "../components/charts/UserChart.vue";
import PlantCharts from "../components/charts/PlantCharts.vue";
// import Bar from "../components/charts/Bar.vue";

const dataValue = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const result = await axios.get("transaction", { headers });
    if (result.status === 200) {
      dataValue.value = result.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
});

// const folders = [
//   {
//     subtitle: 'John Doe',
//     title: 'john@gmail.com',
//     img: '1.jpg',
//   },
// ];
</script>

<style scoped>
/* Add scoped styles if necessary */
</style>
