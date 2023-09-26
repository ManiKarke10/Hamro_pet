import { createApp } from "vue";
import "./assets/style.css";
import App from "./App.vue";
import store from "./store/index.js";
import router from "./router";
import AlignItems from "./components/functions/AlignItems.vue";
const app = createApp(App);

app.use(router);
app.use(store);
app.component("base-card", AlignItems);
app.mount("#app");
