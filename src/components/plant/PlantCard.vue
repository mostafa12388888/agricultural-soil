<template>
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
            :src="plant.Url"
            cover
          >
            <v-card-title>{{ plant.plantName }}</v-card-title>
          </v-img>

          

          <v-card-text >
            <div  class="d-flex justify-space-between align-content-space-between">
              <span>Water</span> 
              <span>{{ plant.water }} L</span>
            </div>
            <div class="d-flex justify-space-between align-content-space-between">
              <span>Temperature</span> <span>{{ plant.temperature }} C</span>
            </div>
            <div class="d-flex justify-space-between align-content-space-between">
              <span>Soil Humidity</span>
              <span>{{ plant.soilHumidity }} %</span>
            </div>

            <div class="d-flex justify-space-between align-content-space-between">
              <span>Humidity</span> <span> {{ plant.Humidity }} %</span>
            </div>

          </v-card-text>

          <v-card-actions>
            <v-btn
              color="orange"
              icon="mdi-book-edit"
              v-tooltip:right="'update'"
            ></v-btn>

            <v-btn
              color="error"
              icon="mdi-delete"
              v-tooltip:right="'delete'"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  <script>
export default {
  data: () => ({
    labels: { 0: "SU", 1: "MO", 2: "TU", 3: "WED", 4: "TH", 5: "FR", 6: "SA" },
    expand: false,
    time: 0,
    forecast: [
      {
        day: "Tuesday",
        icon: "mdi-white-balance-sunny",
        temp: "24\xB0/12\xB0",
      },
      {
        day: "Wednesday",
        icon: "mdi-white-balance-sunny",
        temp: "22\xB0/14\xB0",
      },
      { day: "Thursday", icon: "mdi-cloud", temp: "25\xB0/15\xB0" },
    ],
    plantData: [
      {
        plantName: "soil",
        Url: "	https://swanhose.com/cdn/shop/articles/water-plant-growth_1200x.jpg?v=1683652693",
        water: 12,
        soilHumidity: 22,
        Humidity: 22,
        temperature: 32,
      },
      {
        plantName: "corn",
        Url: "	https://swanhose.com/cdn/shop/articles/water-plant-growth_1200x.jpg?v=1683652693",
        water: 130,
        soilHumidity: 22,
        Humidity: 22,
        temperature: 32,
      },
      {
        plantName: "soil",
        Url: "	https://swanhose.com/cdn/shop/articles/water-plant-growth_1200x.jpg?v=1683652693",
        water: 32,
        soilHumidity: 22,
        Humidity: 22,
        temperature: 32,
      },
      {
        plantName: "soil",
        Url: "	https://swanhose.com/cdn/shop/articles/water-plant-growth_1200x.jpg?v=1683652693",
        water: 12,
        soilHumidity: 22,
        Humidity: 22,
        temperature: 32,
      },
      {
        plantName: "corn",
        Url: "	https://swanhose.com/cdn/shop/articles/water-plant-growth_1200x.jpg?v=1683652693",
        water: 130,
        soilHumidity: 22,
        Humidity: 22,
        temperature: 32,
      },
      {
        plantName: "soil",
        Url: "	https://swanhose.com/cdn/shop/articles/water-plant-growth_1200x.jpg?v=1683652693",
        water: 32,
        soilHumidity: 22,
        Humidity: 22,
        temperature: 32,
      },
      {
        plantName: "soil",
        Url: "	https://swanhose.com/cdn/shop/articles/water-plant-growth_1200x.jpg?v=1683652693",
        water: 12,
        soilHumidity: 22,
        Humidity: 22,
        temperature: 32,
      },
      {
        plantName: "corn",
        Url: "	https://swanhose.com/cdn/shop/articles/water-plant-growth_1200x.jpg?v=1683652693",
        water: 130,
        soilHumidity: 22,
        Humidity: 22,
        temperature: 32,
      },
      {
        plantName: "soil",
        Url: "	https://swanhose.com/cdn/shop/articles/water-plant-growth_1200x.jpg?v=1683652693",
        water: 32,
        soilHumidity: 22,
        Humidity: 22,
        temperature: 32,
      },
      {
        plantName: "soil",
        Url: "	https://swanhose.com/cdn/shop/articles/water-plant-growth_1200x.jpg?v=1683652693",
        water: 12,
        soilHumidity: 22,
        Humidity: 22,
        temperature: 32,
      },
      {
        plantName: "corn",
        Url: "	https://swanhose.com/cdn/shop/articles/water-plant-growth_1200x.jpg?v=1683652693",
        water: 130,
        soilHumidity: 22,
        Humidity: 22,
        temperature: 32,
      },
      {
        plantName: "soil",
        Url: "	https://swanhose.com/cdn/shop/articles/water-plant-growth_1200x.jpg?v=1683652693",
        water: 32,
        soilHumidity: 22,
        Humidity: 22,
        temperature: 32,
      },
    ],
  }),
};
</script>