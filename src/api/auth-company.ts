import apiClient, { CustomAxiosRequestConfig } from "./axios";

export interface CompanySignUpRequest {
  name: string;
  email: string;
  password: string;
}
export interface CompanySignUpResponse {
  message: string;
}

export const companySignup = async (
  data: CompanySignUpRequest
): Promise<CompanySignUpResponse> => {
  const response = await apiClient.post("/company/sign-up", data);
  return response.data;
};

export interface CompanySignInRequest {
  email: string;
  password: string;
}

export interface CompanySignInResponse {
  data: {
    token: string;
    company: any;
  };
  message: string;
}

export const companySignin = async (
  credentials: CompanySignInRequest
): Promise<CompanySignInResponse> => {
  const response = await apiClient.post("/company/sign-in", credentials);
  return response.data;
};

export const companyProfileEdit = async (data: any): Promise<any> => {
  const response = await apiClient.post("/company/edit", data, {
    userType: "company",
  } as CustomAxiosRequestConfig);
  return response.data;
};

export const companyMe = async () => {
  const response = await apiClient.get("/company/me", {
    userType: "company",
  } as CustomAxiosRequestConfig);
  return response.data;
};

export const companyList = async () => {
    const response = await apiClient.get("/company/list");
    return response.data;
}

export const companyById = async (id: string) => {
    const response = await apiClient.get(`/company/${id}`);
    return response.data;
}