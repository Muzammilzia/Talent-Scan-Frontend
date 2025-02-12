import apiClient from "./axios";

export interface CompanySignUpRequest {
    name: string
    email: string
    password: string
}
export interface CompanySignUpResponse {
    message: string
}

export const companySignup = async (data: CompanySignUpRequest): Promise<CompanySignUpResponse> => {
    const response = await apiClient.post("/company/sign-up", data);
  return response.data;
};

export interface CompanySignInRequest {
    email: string
    password: string
}

export interface CompanySignInResponse {
    data: {
        token: string
        company: any
    }
    message: string
}

export const companySignin = async (credentials: CompanySignInRequest): Promise<CompanySignInResponse> => {
  const response = await apiClient.post("/company/sign-in", credentials);
  return response.data;
};

export const companyMe = async () => {
    const response = await apiClient.get("/company/me");
    return response.data;
}