import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let sessionExpired = false;

api.interceptors.request.use(
  (config) => {
    // Let the browser/Axios set the correct multipart boundary
    // when uploading files with FormData.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
      delete config.headers["content-type"];
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    if (status === 401 && !sessionExpired) {
      sessionExpired = true;

      window.dispatchEvent(new Event("session-expired"));

      setTimeout(() => {
        sessionExpired = false;
      }, 1000);
    }

    if (status === 403) {
      window.dispatchEvent(new Event("access-denied"));
    }

    return Promise.reject(error);
  },
);

export default api;
