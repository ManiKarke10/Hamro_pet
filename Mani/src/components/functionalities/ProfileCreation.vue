<template>
  <form @submit="submitForm" enctype="multipart/form-data">
    <div class="profile-image">
      <div class="form-control">
        <label for="profilePic">Upload Your Picture</label>
        <input type="file" id="profilePic" name="profilePic" accept="image/*" @change="uploadFile" />
      </div>
    </div>
    <div class="profile-details">
      <div class="form-control">
        <label for="username">Username</label>
        <input type="text" id="username" v-model.trim="username" />
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="name">Full Name</label>
        <input type="text" id="name" v-model.trim="name" />
      </div>
      <div class="form-control">
        <label for="bio">Bio</label>
        <textarea id="bio" rows="5" v-model.trim="bio"></textarea>
      </div>
      <div class="form-control">
        <label for="speciality">Speciality</label>
        <select name="speciality" id="speciality" v-model.trim="speciality">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="fish">Fish</option>
        </select>
      </div>
      <div class="form-control">
        <label for="rate">Rate</label>
        <input type="number" id="rate" v-model.number="rate" />
      </div>
      <div class="form-control">
        <label for="contact">Contact</label>
        <input type="number" id="contact" v-model.number="contact" />
      </div>
      <div class="form-control">
        <label for="location">Location</label>
        <input type="text" id="location" v-model.trim="location" />
      </div>
    </div>
    <button
      class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
      Submit</button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      username: "",
      profileImageUrl: null,
      email: "",
      name: "",
      bio: "",
      speciality: "dog",
      rate: null,
      contact: null,
      location: "",
    };
  },
  methods: {
    submitForm() {
      const formData = {
        username: this.username,
        profileImageUrl: this.profileImageUrl,
        email: this.email,
        name: this.name,
        bio: this.bio,
        speciality: this.speciality,
        rate: this.rate,
        contact: this.contact,
        location: this.location,
      };

      this.$emit("save-data", formData);
    },
    uploadFile(event) {
      this.profileImageUrl = event.target.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  text-align: left;

  input,
  select,
  textarea {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 12px;
  }
}
</style>
