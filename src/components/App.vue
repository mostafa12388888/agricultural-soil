<template>
  <div>
    <v-app id="inspire" v-if="!isLoginRoute">
      <v-navigation-drawer v-model="drawer" app>
        <header-navebar />
      </v-navigation-drawer>
  
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer />
        <v-col lg="6" cols="12">
          <v-form>
            <v-text-field
              class="p-0 m-0 mt-6"
              full-width
              dense
              append-inner-icon="mdi-magnify"
              outlined
              rounded
              placeholder="Search"
            />
          </v-form>
        </v-col>
        <v-spacer />


        
            <v-btn
              id="menu-activator"
              
            >
            <span style="cursor: pointer" v-bind="attrs" v-on="on">
                <v-chip link>
                  <v-badge dot bottom color="green" offset-y="10" offset-x="10">
                    <v-avatar size="40">
                      <v-img src="https://randomuser.me/api/portraits/women/81.jpg" />
                    </v-avatar>
                  </v-badge>
                  <span class="ml-3">Jane Smith</span>
                </v-chip>
              </span>
            </v-btn>
        
            <v-menu activator="#menu-activator">
                <v-list  :lines="false"
                density="compact"
                nav>
                <v-list>
                    <v-list-item
                      prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
                      subtitle="john@google.com"
                      title="John Leider"
                    >
                      
                    </v-list-item>
                  </v-list>
                    <v-divider />
                    <v-list-item link v-for="(menu, i) in menus"  :key="i">
                        <template v-slot:prepend>
                            <v-icon :icon="menu.icon"></v-icon>
                          </template>
              
                          <v-list-item-title >{{ menu.title }}</v-list-item-title>
                      
                    </v-list-item>
                    <v-list-item link @click="Logout()">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-logout"></v-icon>
                          </template>
              
                          <v-list-item-title >Logout</v-list-item-title>
                      
                    </v-list-item>
                  </v-list>
            </v-menu>

      </v-app-bar>
  
      <v-main>
        <RouterView />

        <!-- Main content goes here -->
      </v-main>
    </v-app>
<div v-else><log-in-view/></div>
    
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import HeaderNavebar from './HeaderNavebar.vue';
  import { RouterLink, RouterView } from 'vue-router'
import LogInView from '@/views/LogInView.vue';
import Cookies from 'js-cookie';


  const drawer = ref(false);
  
  const menus = [
    { title: 'Profile', icon: 'mdi-account',links:"" },
    { title: 'Change Password', icon: 'mdi-key',links:"" },

  ];
  
  const items = [
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      title: 'Brunch this weekend?',
      subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
    },
    { divider: true, inset: true },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
      subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
    },
    { divider: true, inset: true },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      title: 'Oui oui',
      subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
    },
    { divider: true, inset: true },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      title: 'Birthday gift',
      subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
    },
    { divider: true, inset: true },
    {
      avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      title: 'Recipe to try',
      subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
  ];
  </script>
  
  <script>
import axios from 'axios';
  export default {
    components: { HeaderNavebar, LogInView },

  computed: {
    isLoginRoute() {
      return this.$route.name === 'login';
    }
  },
  watch: {
    '$route.name'(newValue, oldValue) {
      if (newValue === 'login') {
        // Perform specific actions for the login route
        console.log('Navigated to login route');
      } else {
        // Perform actions for other routes
        console.log('Navigated away from login route');
      }
    }
  },
  methods: {
    async Logout() {
  // Get token from cookies
  const token = Cookies.get('token');

  // Set Authorization header with token
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    // Make sure to pass headers as the second argument, not as an object itself
    const result = await axios.post('/admin-logout', {}, { headers });

    // Check if the logout was successful based on HTTP status code
    if (result.status === 200) {
      console.log("Logout successful");
      Cookies.remove('token');
      // Assuming $this is referring to Vue instance, use this.$router.push instead of $this.$route.push
      this.$router.push("/login");
    } else {
      console.error("Logout failed with status code:", result.status);
      // Handle other status codes if needed
    }
  } catch (error) {
    console.error("Error during logout:", error);
    // Handle error (e.g., show a message to the user)
  }
}

}}

</script>


  