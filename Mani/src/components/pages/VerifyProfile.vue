<template>
  <base-card>
    <form @submit.prevent class="card">
      <div>
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="files"
          >Upload files</label
        >
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="files"
          type="file"
          name="files"
          ref="files"
          required
          @change="uploadFiles"
          multiple
        />
      </div>
      <div>
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your message</label
        >
        <textarea
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your appeal here..."
          required
          v-model.trim="text"
        ></textarea>
      </div>
      <div>
        <button
          type="button"
          class="text-white mt-5 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          @click="submitForm()"
        >
          Send
        </button>
      </div>
      <div
        class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
        role="alert"
        v-if="!isValid"
      >
        Please fill all the fields before sending.
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      text: "",
      isValid: true,
    };
  },
  methods: {
    uploadFiles() {
      const files = this.$refs.files.files;
      this.files = [...this.files, ...files];
    },
    submitForm() {
      this.isValid = true;
      if (this.files.length === 0 || this.text === "") {
        this.isValid = false;
        return;
      }
      const formData = {
        files: this.files,
        text: this.text,
      };

      this.$store.dispatch("caretakers/sendVerificationRequest", formData);
    },
  },
};
</script>
<style scoped>
.card {
  max-width: 60%;
  margin-left: 20%;
}
</style>
