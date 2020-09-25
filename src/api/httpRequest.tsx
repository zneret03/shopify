import axios from "axios";

const httpRequest = async (method: any, url: any, request: any) => {
  try {
    await axios({
      method: method,
      headers: { "Access-Control-Allow-Origin": "*" },
      url: url,
      data: request,
    }).then((response: any) => {
      return Promise.resolve(response);
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  get(url: string, request: any) {
    return httpRequest("GET", url, request);
  },

  delete(url: string, request: any) {
    return httpRequest("DELETE", url, request);
  },

  post(url: string, request: any) {
    return httpRequest("POST", url, request);
  },

  put(url: string, request: any) {
    return httpRequest("PUT", url, request);
  },
};
