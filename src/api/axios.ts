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
  baseURL: "http://127.0.0.1:8000/api/v1", 
  timeout: 5000,
});

export const CANDIDATE_TOKEN_KEY = 'candidate-token'
export const COMPANY_TOKEN_KEY = 'company-token'

// Add a request interceptor
apiClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const entity = config.userType || "candidate"; // Default to 'candidate'
    const tokenKey = entity === "company" ? COMPANY_TOKEN_KEY : CANDIDATE_TOKEN_KEY;
    const token = localStorage.getItem(tokenKey);

    console.log(token)

    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
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
