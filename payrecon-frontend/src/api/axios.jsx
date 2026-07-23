import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let sessionExpired = false;

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
