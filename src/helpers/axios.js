import axios from "axios";

axios.defaults.timeout = 9000000000;
axios.defaults.baseURL = "https://stage.achareh.ir/api/karfarmas/address";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] =
  "Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4";

axios.interceptors.request.use((config) => {
  return config;
});

export default axios;
