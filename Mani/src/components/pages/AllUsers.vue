<template>
  <base-card>
    <h3
      class="text-3xl text-center mb-10 text-slate-700 font-bold dark:text-white"
    >
      Users of Hamro Pets
    </h3>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <button
        type="button"
        class="text-white mb-30 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        @click="deleteUser(user.id)"
      >
        Add
      </button>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Id</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Role</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in loadUsers"
            :key="user.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ user.name }}
            </th>
            <td class="px-6 py-4">{{ user.id }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4">{{ user.role }}</td>
            <td class="px-6 py-4">
              <button
                type="button"
                class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                @click="deleteUser(user.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </base-card>
</template>

<script>
export default {
  computed: {
    loadUsers() {
      return this.$store.getters["admins/getUsers"];
    },
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$store.dispatch("admins/loadAllUsers");
    },
    deleteUser(id) {
      if (confirm(`Delete user ${id} ?`) == true) {
        this.$store.dispatch("admins/deleteUser", id);
        alert("User Deleted");
      } else {
        alert("You cancelled the deletion");
      }
    },
  },
};
</script>

<style></style>
