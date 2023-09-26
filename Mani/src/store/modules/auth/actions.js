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
      response = await axios.post("http://localhost:5000/api/v1/auth/login", {
        ...loginData,
      });
    } catch (error) {
      context.rootState.error = error.response.data.message;
    }

    const responseData = await response.data;
    if (!responseData) {
    }
    const userId = responseData.userdetails.id;

    localStorage.setItem("token", responseData.token);
    localStorage.setItem("userId", userId);

    context.commit("setUser", {
      token: responseData.token,
      userId: userId,
    });
    router.push("/");
  },

  async signup(context, payload) {
    const registrationData = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    };
    let response = "";
    try {
      response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        {
          ...registrationData,
        }
      );
    } catch (error) {
      context.rootState.error = error.response.data.message;
    }

    const responseData = await response.data;

    const userId = responseData.user._id;
    console.log(userId);
    context.commit("setUser", {
      token: responseData.token,
      userId: userId,
    });
    router.push("/");
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  async getAdmins(context) {
    const token = context.rootGetters.token;
    let response = "";
    try {
      response = await axios.get("http://localhost:5000/api/v1/admins", {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error) {
      context.rootState.error = error.response.data.message.message;
    }
    const responseData = await response.data.admins;

    const admins = [];
    console.log(responseData);
    for (const key in responseData) {
      const admin = {
        userId: responseData[key].userID,
        name: responseData[key].name,
        username: responseData[key].username,
        email: responseData[key].email,
      };
      admins.push(admin);
    }
    context.commit("setAdmin", admins);
  },
};
