<template>
  <div class="w-96 mt-20 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="flex flex-col items-center mt-10 pb-8">
      <img class="w-24 h-24 mb-3 rounded-full shadow-lg" :src="`http://localhost:8080/profiles/${imageUrl}`"
        alt="Profile Picture" />
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
        <router-link :to="caretakerContactLink" v-if="!isCaretaker"><button
            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span
              class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Message
            </span>
          </button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "imageUrl", "Name", "speciality", "rate", "location", "bio"],
  computed: {
    caretakerContactLink() {
      return this.$route.path + "/" + this.id + "/contact"; // /caretakers/1/contact
    },
    isCaretaker() {
      return this.$store.getters["caretakers/isCaretaker"];
    },
  },
};
</script>

<style></style>
