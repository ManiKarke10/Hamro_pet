<template>
  <base-card>
    <div class="split-half">
      <div class="left">
        <h2 class="text-4xl font-extrabold dark:text-white">
          Our trusted Caretakers
        </h2>
        <p class="my-4 text-lg text-gray-500">
          Maybe You Can find Someone you like.
        </p>
      </div>
      <div class="right">
        <button type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="loadCaretakers()">
          Refresh
        </button>
        <router-link to="requests">
          <button type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            v-if="isCaretaker">
            My Messages
          </button>
        </router-link>
      </div>
    </div>
    <div>
      <filter-caretakers @change-filter="applyFilters"></filter-caretakers>
    </div>
    <div v-if="availableCaretakers.length === 0">
      <p>No Caretakers Available</p>
    </div>

    <div class="container">
      <div class="item">
        <caretaker-details v-for="people in availableCaretakers" :key="people.profileId" :id="people.profileId"
          :imageUrl="people.profileImageUrl" :Name="people.name" :speciality="people.speciality" :rate="people.rate"
          :location="people.location" :bio="people.bio"></caretaker-details>
      </div>
    </div>
  </base-card>
</template>

<script>
import CaretakerDetails from "../functionalities/CaretakerDetails.vue";
import FilterCaretakers from "../functionalities/FilterCaretakers.vue";
export default {
  data() {
    return {
      activeFilters: {
        dog: true,
        cat: true,
        fish: true,
      },
    };
  },
  components: {
    CaretakerDetails,
    FilterCaretakers,
  },
  computed: {
    availableCaretakers() {
      const caretakers = this.$store.getters["caretakers/caretakers"];
      return caretakers.filter((caretaker) => {
        if (this.activeFilters.dog && caretaker.speciality.includes("dog")) {
          return true;
        }
        if (this.activeFilters.cat && caretaker.speciality.includes("cat")) {
          return true;
        }
        if (this.activeFilters.fish && caretaker.speciality.includes("fish")) {
          return true;
        }
        return false;
      });
    },
    hasCaretakers() {
      return this.$store.getters["caretakers/hasCaretakers"];
    },
    isCaretaker() {
      return this.$store.getters["caretakers/isCaretaker"];
    },
  },
  created() {
    this.loadCaretakers();
  },
  methods: {
    applyFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    loadCaretakers() {
      this.$store.dispatch("caretakers/loadCaretakers");
    },
  },
};
</script>

<style scoped>
.split-half {
  overflow: hidden;
}

.left {
  float: left;
}

.right {
  float: right;
}

.item {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
</style>
