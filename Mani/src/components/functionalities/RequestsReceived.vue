<template>
  <div class="card">
    <div
      class="max-w-sm p-6 m-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Service Type : {{ serviceType }}
      </h5>

      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Requested By: {{ requestorName }}
      </p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Service Of: {{ serviceOf }}
      </p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        PickUp Date : {{ pickUpDate }}
      </p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Drop Off Date : {{ dropOffDate }}
      </p>
      <div>
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          v-if="`${status}` == 'requested'"
          @click="acceptRequest"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Accept
          </span>
        </button>
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          v-if="`${status}` == 'requested'"
          @click="rejectRequest"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Reject
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["accept-request", "reject-request"],
  props: [
    "id",
    "requestorName",
    "serviceType",
    "serviceOf",
    "pickUpDate",
    "dropOffDate",
    "status",
  ],
  data() {
    return {
      serviceId: null,
    };
  },

  methods: {
    acceptRequest() {
      this.serviceId = {
        id: this.id,
      };
      this.$emit("accept-request", this.serviceId);
    },
    rejectRequest() {
      this.serviceId = {
        id: this.id,
      };
      this.$emit("reject-request", this.serviceId);
    },
  },
};
</script>

<style scoped>
.card {
  width: 40%;
  margin-left: 10%;
}
</style>
