<template>
  <the-navigation></the-navigation>
  <router-view></router-view>

  <error-message></error-message>
  <success-message></success-message>
</template>

<script>
import ErrorMessage from "./components/functions/ErrorMessage.vue";
import TheNavigation from "./Navbar/TheNavigation.vue";
import SuccessMessage from "./components/functions/SuccessMessage.vue";
export default {
  components: { TheNavigation, ErrorMessage, SuccessMessage },
  created() {
    this.$store.dispatch("tryLogin");
  },
};
</script>
