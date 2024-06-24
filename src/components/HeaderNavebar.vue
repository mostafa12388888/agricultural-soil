<template>
    <!-- <v-navigation-drawer v-model="drawer" app> -->
      <v-img
        height="140"
        class="pa-4"
        src=""
      >
        <div class="text-center">
          <v-avatar class="mb-4" color="grey darken-1" size="64">
            <v-img
              aspect-ratio="30"
              src="./noun-smart-farm-5344062.svg"
            />
          </v-avatar>
          <h2 class="white--text">Agricultural Soil</h2>
        </div>
      </v-img>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="[icon, text,link] in links" :to="link"  :key="icon" link>
            <template v-slot:prepend>

            <v-icon>{{ icon }}</v-icon>
         </template>
         <!-- <router-link > -->
          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        <!-- </router-link> -->
        </v-list-item>
        
      </v-list>
    <!-- </v-navigation-drawer> -->
  </template>
  
  <script>
  export default {
    name: "Sidebar",
    props: ["drawer"],
    data() {
      return {
        links: [
          ["mdi-microsoft-windows", "Dashboard","/"],
          ["mdi-account", "Admin","/admin"],
          ["mdi-clipboard-list-outline", "Users","/users"],
          ["mdi-card-account-details-outline", "plants","/plants"],
        ],
      };
    },
  };
  </script>
  
  <style scoped></style>