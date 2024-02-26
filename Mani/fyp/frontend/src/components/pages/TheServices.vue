<template>
  <base-card>
    <div>
      <router-link to="myservices"><button type="button"
          class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          v-if="isCaretaker">
          My Services
        </button>
      </router-link>

      <h3 class="text-3xl text-center font-bold dark:text-white">
        Find Your Suitable Sitter
      </h3>
    </div>
    <div class="services">
      <div class="overnightServices">
        <div>
          <span>Overnight Service</span>
        </div>
        <button type="button" @click="handleOvernightServices" value="Pet-Boarding">
          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z">
            </path>
          </svg>
          <span>Pet Boarding</span>
        </button>
      </div>
      <div class="daytimeServices">
        <div>
          <span>Daytime Service</span>
        </div>
        <div class="serviceChoices">
          <button type="button" @click="handleDayCareServices">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z">
              </path>
            </svg>
            <span>Day Care</span>
          </button>

          <button type="button" @click="handleHouseVisitServices">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25">
              </path>
            </svg>
            <span>House Visit</span>
          </button>

          <button type="button" @click="handlePetWalkingServices">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path>
            </svg>
            <span>Pet Walking</span>
          </button>

          <button type="button" @click="handleDogTrainingServices">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0">
              </path>
            </svg>
            <span>Dog Training</span>
          </button>
        </div>
      </div>
    </div>

    <div class="inputContainers">
      <div class="overnightInput" v-if="overnightServices">
        <h1>The service chosen is: {{ serviceValue }}</h1>
        <div class="inputs">
          <div class="inputItem">
            <label for="location">Location</label>
            <input type="text" id="location" placeholder="Area Near" v-model="location" />
          </div>

          <div class="inputItem">
            <label for="pets">Select Your Pet</label>
            <select name="pets" id="pets" v-model="pet">
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="fish">Fish</option>
            </select>
          </div>

          <div class="inputItem">
            <label for="pickUp">Select Pick Up Date</label>
            <input type="date" name="pickUp" id="pickUp" v-model="pickUpDate" />
          </div>

          <div class="inputItem">
            <label for="dropOff">Select Drop Off Date</label>
            <input type="date" name="dropOff" id="dropOff" v-model="dropOffDate" />
          </div>
        </div>
        <button class="search-btn" @click="handleSearch">Search</button>
      </div>
      <div class="dayInputs" v-if="daytimeServices">
        <h1>The service chosen is: {{ serviceValue }}</h1>
        <div class="inputs">
          <div class="inputItem">
            <label for="location">Location</label>
            <input type="text" id="location" placeholder="Area Near" v-model="location" />
          </div>

          <div class="inputItem">
            <label for="pets">Select Your Pet</label>
            <select name="pets" id="pets" v-model="pet">
              <option value="dog">Dog</option>
              <option v-if="!dogTraining" value="cat">Cat</option>
              <option v-if="!petWalking && !dogTraining" value="fish">
                Fish
              </option>
            </select>
          </div>

          <div class="inputItem">
            <label for="pickUp">Select Date</label>
            <input type="date" name="pickUp" id="pickUp" v-model="pickUpDate" />
          </div>
        </div>
        <button class="search-btn" @click="handleSearch">Search</button>
      </div>
    </div>

    <div v-if="startSearch && matchingCaretakers.length === 0"
      class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
      Sorry we don't have any caretakers near that area for the required pet.
    </div>

    <div v-else-if="startSearch">
      <div class="caretakersResult">
        <div v-for="people in matchingCaretakers" :key="people.profileId">
          <searched-caretaker @send-request="sendRequest" :key="people.profileId" :id="people.profileId"
            :imageUrl="people.profileImageUrl" :Name="people.name" :speciality="people.speciality" :rate="people.rate"
            :location="people.location" :bio="people.bio"></searched-caretaker>
        </div>
        <div class="spacer"></div>
      </div>
    </div>
  </base-card>
</template>
<script>
import SearchedCaretaker from "../functionalities/SearchedCaretaker.vue";

export default {
  data() {
    return {
      receiversId: "",
      startSearch: false,
      petWalking: false,
      dogTraining: false,
      overnightServices: true,
      daytimeServices: false,
      location: "",
      pet: "dog",
      pickUpDate: "",
      dropOffDate: "",
      serviceValue: "Pet Boarding",
    };
  },
  components: { SearchedCaretaker },
  computed: {
    matchingCaretakers() {
      const caretakers = this.$store.getters["caretakers/caretakers"];

      return caretakers.filter((caretaker) => {
        if (
          this.pet === caretaker.speciality &&
          this.location === caretaker.location
        ) {
          return true;
        }
      });
    },
    isCaretaker() {
      return this.$store.getters["caretakers/isCaretaker"];
    },
  },
  mounted() {
    this.loadCaretakers();
  },
  methods: {
    loadCaretakers() {
      this.$store.dispatch("caretakers/loadCaretakers");
    },
    sendRequest(receiversDetails) {
    console.log('das',receiversDetails.rate);
    this.receiversId = receiversDetails.id;
      const requestDetails = {
        receiversId: this.receiversId,
        rate: receiversDetails.rate * 100,
        serviceType: this.serviceValue,
        serviceOf: this.pet,
        pickUpDate: this.pickUpDate,
        dropOffDate: this.dropOffDate,
      };

      this.$store.dispatch("requests/contactCaretaker", requestDetails);
    },
    handleSearch() {
      if (this.location !== "") {
        this.startSearch = true;
        this.$store.dispatch("caretakers/loadCaretakers");
      }
    },

    handleOvernightServices() {
      this.startSearch = false;
      this.overnightServices = true;
      this.daytimeServices = false;
      this.serviceValue = "Pet Boarding";
    },
    handleDayCareServices() {
      this.startSearch = false;
      this.overnightServices = false;
      this.petWalking = false;
      this.daytimeServices = true;
      this.serviceValue = "Day Care";
    },
    handleHouseVisitServices() {
      this.startSearch = false;
      this.overnightServices = false;
      this.petWalking = false;
      this.daytimeServices = true;
      this.serviceValue = "House Visit";
    },
    handlePetWalkingServices() {
      this.startSearch = false;
      this.overnightServices = false;
      this.daytimeServices = true;
      this.dogTraining = false;
      this.petWalking = true;
      this.serviceValue = "Pet Walking";
    },
    handleDogTrainingServices() {
      this.startSearch = false;
      this.overnightServices = false;
      this.petWalking = false;
      this.daytimeServices = true;
      this.dogTraining = true;
      this.serviceValue = "Dog Training";
    },
  },
};
</script>

<style lang="scss" scoped>
.inputContainers {
  margin-top: 3rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

h1 {
  text-align: center;
  font-size: 22px;
}

.services {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  margin-top: 3rem;
  display: flex;

  .overnightServices {
    flex: 40%;

    button {
      padding: 20px;
      margin: 15px;
      margin-left: 0px;
      box-shadow: 5px 5px rgb(90, 151, 212);
      border-radius: 10px;
      transition-duration: 0.4s;
    }

    button:hover {
      background-color: #68c5e7;
      /* Green */
      color: white;
    }
  }

  .daytimeServices {
    flex: 60%;

    button {
      padding: 15px;
      margin: 15px;
      margin-left: 0px;
      box-shadow: 5px 5px rgb(90, 151, 212);
      border-radius: 10px;
      transition-duration: 0.4s;
    }

    button:hover {
      background-color: #68c5e7;
      /* Green */
      color: white;
    }
  }

  .serviceChoices {
    padding: 20px;
    display: inline-block;

    button {
      margin-right: 30px;
    }
  }
}

.inputs {
  display: flex;
  flex-wrap: wrap;

  .inputItem {
    flex: 40%;
    margin: 10px;
    padding: 5px;

    input[type="text"] {
      width: 80%;
      padding: 12px 20px;
      margin: 8px;
      border-radius: 10px;
    }

    select {
      text-align: left;
      width: 80%;
      padding: 12px 20px;
      margin: 8px;
      border: none;
      border-radius: 10px;
      background-color: #fafafa;
    }

    input[type="date"] {
      width: auto;
      padding: 12px 20px;
      margin: 8px;
      border-radius: 10px;
    }
  }
}

.search-btn {
  padding: 12px 20px;
  margin: 9px;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: #dee3dd;
  transition-duration: 0.4s;
}

.search-btn:hover {
  background-color: #68c5e7;
  /* Green */
  color: white;
}

.caretakersResult {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;

  .card {
    flex: 40%;
    margin: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    transition: transform 0.5s;
  }

  .card:hover {
    transform: scale(1.05);
  }
}
</style>
