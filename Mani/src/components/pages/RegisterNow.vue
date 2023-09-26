<template>
  <div class="container">
    <div
      class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <form class="space-y-6" @submit.prevent>
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          Join our platform
        </h5>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Full Name</label
          >
          <input
            type="text"
            name="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="John Doe"
            v-model.trim="name"
            required
          />
        </div>
        <div>
          <div class="flex items-center mb-4">
            <input
              id="caretaker"
              type="radio"
              value="caretaker"
              name="caretaker"
              v-model="role"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="caretaker"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Caretaker</label
            >
          </div>
          <div class="flex items-center">
            <input
              checked
              id="careseeker"
              type="radio"
              value="careseeker"
              name="careseeker"
              v-model="role"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="careseeker"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Careseeker</label
            >
          </div>
        </div>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@gmail.com"
            v-model.trim="email"
            required
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your password</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            v-model.trim="password"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="submitForm"
        >
          Register
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already registered?
          <router-link
            to="/login"
            class="text-blue-700 hover:underline dark:text-blue-500"
            >Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: true,
      name: "",
      email: "",
      password: "",
      role: null,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.name === "" ||
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6 ||
        this.role === null
      ) {
        this.formIsValid = false;
        return;
      }

      this.$store.dispatch("signup", {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
      });
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* optional */
}
</style>
