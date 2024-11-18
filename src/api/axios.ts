import axios, {
  AxiosHeaders,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

type UserType = "candidate" | "company";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  userType?: UserType; 
}

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: "", 
  timeout: 5000,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const entity = config.userType || "candidate"; // Default to 'candidate'
    const tokenKey = entity === "company" ? "company_token" : "candidate_token";
    const token = localStorage.getItem(tokenKey);

    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
      //   config.headers = {
      //     ...config.headers,
      //     Authorization: `Bearer ${token}`,
      //   };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
