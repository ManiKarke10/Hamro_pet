import axios from "axios";

export default {
  async contactCaretaker(context, payload) {
    const token = context.rootGetters.token;
    const caretakerId = payload.receiversId;
    const rate = payload.rate;
    const newRequest = {
      //receiversId: payload.receiversId,
      serviceType: payload.serviceType,
      serviceOf: payload.serviceOf,
      pickUpDate: payload.pickUpDate,
      dropOffDate: payload.dropOffDate,
    };
    console.log('this is rate',rate);
    const khaltiRequest = {
      "return_url": "https://hamro-pet.vercel.app/",
      "website_url":"https://hamro-pet.vercel.app/",
      "amount": rate,
      "purchase_order_id": caretakerId,
      "purchase_order_name":caretakerId,
    }
    let response = "";
    let  paymentResponse = "";
    try {
      response = await axios.post(
        `https://hamro-pet.onrender.com/api/v1/services/${caretakerId}`,
        {
          ...newRequest,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

    console.log(response);
       // Payment request
      paymentResponse = await axios.post(
        'https://hamro-pet.onrender.com/api/v1/services/khaltiapi',
        { ...khaltiRequest },
        { headers: { Authorization: "Bearer " + token } }
    );

    // Handle payment response as needed
    console.log('Payment Response:', paymentResponse.data.data.payment_url);
    window.open(paymentResponse.data.data.payment_url);
    } 
    
    catch (error) {
      context.rootState.error = error.response.data.message;
    }

    context.rootState.success = `Contacted ${caretakerId} for the request`;
    context.commit("addRequest", newRequest);
  },
  async getContactRequests(context) {
    const token = context.rootGetters.token;

    let response = "";
    try {
      response = await axios.get("https://hamro-pet.onrender.com/api/v1/services", {
        headers: { Authorization: "Bearer " + token },
      });
      const responseData = await response.data;

      const requests = [];

      for (const key in responseData) {
        const request = {
          id: responseData[key]._id,
          requestorName: responseData[key].requestorName,
          requestedBy: responseData[key].careseeker,
          serviceType: responseData[key].serviceType,
          serviceOf: responseData[key].serviceOf,
          status: responseData[key].status,
          pickUpDate: responseData[key].pickUpDate,
          dropOffDate: responseData[key].dropOffDate,
        };
        requests.push(request);
      }

      context.commit("setServiceRequests", requests);
    } catch (error) {
      context.rootState.error = error.response.data.message;
    }
  },
  async getAcceptedRequests(context) {
    const token = context.rootGetters.token;
    let response = "";
    try {
      response = await axios.get(
        "https://hamro-pet.onrender.com/api/v1/services/acceptedrequests",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      const responseData = await response.data;

      const requests = [];

      for (const key in responseData) {
        const request = {
          id: responseData[key]._id,
          requestorName: responseData[key].requestorName,
          requestedBy: responseData[key].careseeker,
          serviceType: responseData[key].serviceType,
          serviceOf: responseData[key].serviceOf,
          status: responseData[key].status,

          pickUpDate: responseData[key].pickUpDate,
          dropOffDate: responseData[key].dropOffDate,
        };
        requests.push(request);
      }
      context.commit("setServiceRequests", requests);
    } catch (error) {
      context.rootState.error = error.response.data.message;
    }
  },
  async getRejectedRequests(context) {
    const token = context.rootGetters.token;
    let response = "";
    try {
      response = await axios.get(
        "https://hamro-pet.onrender.com/api/v1/services/rejectedrequests",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      const responseData = await response.data;

      const requests = [];

      for (const key in responseData) {
        const request = {
          id: responseData[key]._id,
          requestorName: responseData[key].requestorName,
          requestedBy: responseData[key].careseeker,
          serviceType: responseData[key].serviceType,
          serviceOf: responseData[key].serviceOf,
          status: responseData[key].status,

          pickUpDate: responseData[key].pickUpDate,
          dropOffDate: responseData[key].dropOffDate,
        };
        requests.push(request);
      }
      context.commit("setServiceRequests", requests);
    } catch (error) {
      context.rootState.error = error.response.data.message;
    }
  },

  async rejectRequest(context, payload) {
    const token = context.rootGetters.token;
    const serviceId = payload.id;
    //yo id bata state ko request find garera
    //tesko status update garaidiney
    //auto hatxa ani

    /* const response = await axios.patch(
      `https://hamro-pet.onrender.com/api/v1/services/${serviceId}/reject`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    ); */
    let response = "";
    try {
      response = await axios({
        method: "patch",
        url: `https://hamro-pet.onrender.com/api/v1/services/${serviceId}/reject`,
        headers: { Authorization: "Bearer " + token },
      });
      let requests = context.state.requests;
      /* console.log(requests, "........................");
      // console.log(serviceId, "serviceId.................");
      // console.log(requests, "requests.................");

      let updatedRequest = requests.map(modify);
      function modify(item) {
        if (item.id == serviceId) {
          item.status = "rejected";
          return item;
        }
        return item;
      } */

      const updatedRequests = requests.filter(
        (request) => request.id != serviceId
      );

      // console.log(updatedRequest, "updatedRequest---------------------");
      context.commit("setServiceRequests", updatedRequests);
      context.rootState.success = "Rejected Request successfully.";
    } catch (error) {
      context.rootState.error = error.response.data.message;
    }
  },

  async acceptRequest(context, payload) {
    const token = context.rootGetters.token;
    const serviceId = payload.id;

    /* const response = await axios.patch(
      `https://hamro-pet.onrender.com/api/v1/services/${serviceId}/accept`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    ); */
    let response = "";
    try {
      response = await axios({
        method: "patch",
        url: `https://hamro-pet.onrender.com/api/v1/services/${serviceId}/accept`,
        headers: { Authorization: "Bearer " + token },
      });
      let requests = context.state.requests;

      const updatedRequests = requests.filter(
        (request) => request.id != serviceId
      );
      context.commit("setServiceRequests", updatedRequests);

      context.rootState.success = "Accepted Request successfully.";
    } catch (error) {
      context.rootState.error = error.response.data.message;
    }
  },
};

    