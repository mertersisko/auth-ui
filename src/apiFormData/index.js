import axios from "axios";
import config from "@/config.js";
import errorHadler from "@/stores/error_hander_store";

const apiFormData = axios.create({
  baseURL: config.odata_api_url,
});

apiFormData.CancelToken = axios.CancelToken;
apiFormData.isCancel = axios.isCancel;

apiFormData.interceptors.request.use(
  (config) => {
    let key = localStorage.getItem("key");

    if (key) config.headers["Authorization"] = `Bearer ${key}`;

    config.headers["Content-type"] = "multipart/form-data";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiFormData.interceptors.response.use(
  (response) => {
    if (response.status === 200) errorHadler().formErrors = {};
    return response;
  },
  (error) => {
    if (error.response) {
      console.log(error.message);

      if (error.response.status === 405) {
        errorHadler().showMessage([error.message]);
      } else errorHadler().prepareApiError(error.response.data);
    } else {
      errorHadler().showMessage([error.message]);
    }
  }
);

export default apiFormData;
