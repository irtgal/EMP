import { createApp } from 'vue';
import { Quasar } from 'quasar';
import App from './App.vue';
import router from './router';
import { pinia } from './boot/pinia';


const app = createApp(App);

app.use(router);
app.use(Quasar);
app.use(pinia);

app.mount('#app');