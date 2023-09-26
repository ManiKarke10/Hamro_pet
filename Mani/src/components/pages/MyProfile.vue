<template>
  <base-card>
    <div v-if="!hasProfile && isCaretaker">
      <profile-creation @save-data="saveData"></profile-creation>
    </div>

    <div v-if="!hasProfile && !isCaretaker">
      <p class="mb-3 text-gray-500 dark:text-gray-400">
        Only caretakers and admins have access to this page. Please redirect to
        <router-link
          to="caretakers"
          class="font-medium text-blue-600 underline dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:no-underline"
          >Caretakers</router-link
        >
        page to know our professionals.
      </p>
    </div>
    <div v-if="isAdmin">
      <router-link to="/allusers">
        <button
          type="button"
          class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          All Users
        </button>
      </router-link>
    </div>
    <div v-if="isAdmin">
      <router-link to="/chart">
        <button
          type="button"
          class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Users Chart
        </button>
      </router-link>
    </div>
    <div v-if="isAdmin">
      <router-link to="/allprofiles">
        <button
          type="button"
          class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          All Profiles
        </button>
      </router-link>
    </div>

    <div v-for="profile in myProfile" :key="profile.profileId">
      <profile-details
        :id="profile.profileId"
        :username="profile.username"
        :imageUrl="profile.imageUrl"
        :email="profile.email"
        :Name="profile.name"
        :speciality="profile.speciality"
        :rate="profile.rate"
        :contact="profile.contact"
        :location="profile.location"
        :bio="profile.bio"
        :verificationStatus="profile.verificationStatus"
      >
      </profile-details>
      <router-link to="/applyforverification" v-if="!isVerified">
        <button
          type="button"
          class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Apply For Verification
        </button>
      </router-link>
    </div>
  </base-card>
</template>
<script>
import ProfileDetails from "../functionalities/ProfileDetails.vue";
import ProfileCreation from "../functionalities/ProfileCreation.vue";
export default {
  data() {
    return {};
  },
  components: { ProfileDetails, ProfileCreation },
  mounted() {
    this.loadCaretakers();
    this.loadAdmins();
  },
  computed: {
    myProfile() {
      return this.$store.getters["caretakers/myProfile"];
    },
    isLoggedIn() {
      return this.$store.getters["isLoggedIn"];
    },
    isCaretaker() {
      return this.$store.getters["caretakers/isCaretaker"];
    },
    hasProfile() {
      return this.$store.getters["caretakers/hasProfile"];
    },
    isVerified() {
      return this.$store.getters["caretakers/isVerified"];
    },
    isAdmin() {
      return this.$store.getters["isAdmin"];
    },
  },
  methods: {
    loadCaretakers() {
      this.$store.dispatch("caretakers/getMyProfile");
    },
    loadAdmins() {
      this.$store.dispatch("getAdmins");
    },

    saveData(formData) {
      this.$store.dispatch("caretakers/addProfile", formData);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  max-width: 90%;
}
.profileCreationForm {
  .card {
    max-width: 50%;
  }
}
.view-all-users-btn {
  background-color: #007bff; /* blue background color */
  color: #fff; /* white text color */
  padding: 10px 20px; /* adds padding to the top and bottom 10px and left and right 20px */
  border: none; /* removes the default border */
  border-radius: 5px; /* adds rounded corners */
  cursor: pointer; /* changes cursor to a pointer on hover */
  font-size: 16px; /* sets font size to 16px */
  font-weight: bold; /* sets font weight to bold */
  text-transform: uppercase; /* makes text uppercase */
  transition: all 0.2s ease-in-out; /* adds a smooth transition */
}

.view-all-users-btn:hover {
  background-color: #0062cc; /* changes background color on hover */
}
</style>
