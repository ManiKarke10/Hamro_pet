<template>
  <div
    class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex flex-col items-center pb-10">
      <img
        class="w-24 h-24 mb-3 rounded-full shadow-lg"
        :src="`http://localhost:5000/profiles/${imageUrl}`"
        alt="Profile Picture"
      />
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {{ Name }}
      </h5>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        Takes care of: {{ speciality }}
      </span>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        Rate : $ {{ rate }} p/day
      </span>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        Location : {{ location }}
      </span>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        Bio : {{ bio }}
      </span>
      <div class="flex mt-4 space-x-3 md:mt-6">
        <button
          v-if="!isCaretaker"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          @click="sendRequest()"
        >
          Request
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "imageUrl", "Name", "speciality", "rate", "location", "bio"],
  emits: ["send-request"],
  data() {
    return {
      receiversDetails: null,
    };
  },
  computed: {
    /* caretakerContactLink() {
      return this.$route.path + "/" + this.id + "/contact"; // /caretakers/1/contact
    }, */
    isCaretaker() {
      return this.$store.getters["caretakers/isCaretaker"];
    },
  },
  methods: {
    sendRequest() {
      this.receiversDetails = {
        id: this.id,
      };
      console.log(this.receiversDetails);
      this.$emit("send-request", this.receiversDetails);
    },
  },
};
</script>

<style></style>
