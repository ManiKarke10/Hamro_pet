import axios from "axios";
import router from "../../../router";

export default {
  async login(context, payload) {
    const loginData = {
      email: payload.email,
      password: payload.password,
    };
    let response = "";
    try {
      response = await axios.post("http://localhost:8080/api/v1/auth/login", {
        ...loginData,
      });
      const responseData = await response.data;
      console.log(responseData, 'Login paxi ko data');
      const userId = responseData.userdetails.id;

      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", responseData.userdetails.role);

      context.commit("setUser", {
        token: responseData.token,
        userId: userId,
        role: responseData.userdetails.role,
      });
      router.push("/");
    } catch (error) {
      context.rootState.error = error.response.data.message;
    }
  },

  async signup(context, payload) {
    const registrationData = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    };
    console.log(registrationData, 'registrationData');
    let response = "";
    try {
      response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          ...registrationData,
        }
      );
      const responseData = await response.data;

      const userId = responseData.user._id;
      context.commit("setUser", {
        token: responseData.token,
        userId: userId,
        role: responseData.user.role,
      });
      router.push("/");
    } catch (error) {
      context.rootState.error = error.response.data.message;
    }

  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role")

    if (token && userId && role) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        role: role,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    context.commit("setUser", {
      token: null,
      userId: null,
      role: null,
    });
    context.commit("caretakers/removeInitial", {
      caretakers: [],
      profile: null,
    });
  },
  async getAdmins(context) {
    const token = context.rootGetters.token;
    let response = "";
    try {
      response = await axios.get("http://localhost:8080/api/v1/admins", {
        headers: { Authorization: "Bearer " + token },
      });
      const responseData = await response.data.admins;
      const admins = [];
      for (const key in responseData) {
        const admin = {
          userId: responseData[key].userId,
          name: responseData[key].name,
          username: responseData[key].username,
          email: responseData[key].email,
        };
        admins.push(admin);
      }
      context.commit("setAdmin", admins);
    } catch (error) {
      context.rootState.error = error.response.data.message.message;
    }
  },
};
