<template>
  <base-card>
    <div class="profile-container">
      <div class="profile-image">
        <img
          :src="`https://hamro-pet.onrender.com/profiles/${imageUrl}`"
          alt="Image Here"
        />
      </div>
      <form @submit.prevent enctype="multipart/form-data">
        <div class="profile-details">
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="profilePic"
                >Update Profile</label
              >
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="profilePic"
                type="file"
                name="profilePic"
                accept="image/*"
                @change="uploadFile"
              />
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="username"
                required
                id="username"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                :readonly="false"
                v-model="updatedUsername"
              />
              <label
                for="username"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Username</label
              >
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                id="email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                v-model="updatedEmail"
                :readonly="true"
              />
              <label
                for="email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Email address</label
              >
            </div>
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="name"
                required
                id="name"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                v-model="updatedName"
                :readonly="false"
              />
              <label
                for="name"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Full Name</label
              >
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="speciality"
                id="speciality"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                :readonly="true"
                v-model="updatedSpeciality"
              />
              <label
                for="speciality"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Speciality</label
              >
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="number"
                name="rate"
                required
                id="rate"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                :readonly="false"
                v-model="updatedRate"
              />
              <label
                for="rate"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Rate</label
              >
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="number"
                name="contact"
                required
                id="contact"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                :readonly="false"
                v-model="updatedContact"
              />
              <label
                for="contact"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Contact</label
              >
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="location"
                required
                id="location"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                v-model="updatedLocation"
                :readonly="false"
              />
              <label
                for="location"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Location</label
              >
            </div>
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <textarea
                name="bio"
                required
                id="bio"
                v-model="updatedBio"
                :readonly="false"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              ></textarea>
              <label
                for="bio"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Bio</label
              >
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="updateProfile"
        >
          Update
        </button>
      </form>
    </div>
  </base-card>
</template>

<script>
export default {
  /* mounted() {
    (this.updatedUsername = this.username),
      (this.updatedName = this.Name),
      (this.updatedBio = this.bio),
      (this.updatedRate = this.rate),
      (this.updatedContact = this.contact),
      (this.updatedLocation = this.location);
  }, */
  props: [
    "id",
    "username",
    "imageUrl",
    "email",
    "Name",
    "speciality",
    "rate",
    "contact",
    "location",
    "bio",
    "verificationStatus",
  ],
  data() {
    return {
      updatedUsername: this.username,
      updatedName: this.Name,
      updatedBio: this.bio,
      updatedRate: this.rate,
      updatedContact: this.contact,
      updatedLocation: this.location,
      updatedEmail: this.email,
      updatedSpeciality: this.speciality,
      updatedProfileImageUrl: this.imageUrl,
    };
  },
  methods: {
    updateProfile() {
      const formData = {
        username: this.updatedUsername,
        profileImageUrl: this.updatedProfileImageUrl,

        name: this.updatedName,
        bio: this.updatedBio,

        rate: this.updatedRate,
        contact: this.updatedContact,
        location: this.updatedLocation,
      };
      this.$store.dispatch("caretakers/updateMyProfile", formData);
    },
    uploadFile(event) {
      this.updatedProfileImageUrl = event.target.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 200px;
  width: 200px;
  border-radius: 20%;
}
.profile-container {
  display: grid;
  grid-template-columns: 1fr 2fr; /* change the ratio as needed */
  gap: 20px; /* adjust the gap as needed */
}

.profile-image {
  grid-column: 1 / 2; /* position the image on the left */
}

.profile-details {
  grid-column: 2 / 3; /* position the details on the right */
}
</style>
