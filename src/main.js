// import './assets/main.css'
import '@mdi/font/css/materialdesignicons.min.css';
import "./axios"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'
// import { enableLicense } from '@syncfusion/ej2-base';
import { registerLicense } from '@syncfusion/ej2-base';

// Set the Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF5cXmpCeUx0QHxbf1x0ZFRMYFtbR35PMyBoS35RckVlW3pecXZXRGZUWEVx');
const vuetify = createVuetify({
    components,
    directives,
  })
const app = createApp(App)

app.use(createPinia())
app.use(router).use(vuetify)

app.mount('#app')
