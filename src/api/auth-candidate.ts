import apiClient, { CustomAxiosRequestConfig } from "./axios";

export interface CandidateSignUpRequest {
    fullName: string
    email: string
    password: string
}
export interface CandidateSignUpResponse {
    message: string
}

export const candidateSignup = async (data: FormData): Promise<CandidateSignUpResponse> => {
    const response = await apiClient.post("/candidate/sign-up", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
  return response.data;
};

export interface CandidateSignInRequest {
    email: string
    password: string
}

export interface CandidateSignInResponse {
    data: {
        token: string
        candidate: any
    }
    message: string
}

export const candidateSignin = async (credentials: CandidateSignInRequest): Promise<CandidateSignInResponse> => {
  const response = await apiClient.post("/candidate/sign-in", credentials);
  return response.data;
};

export interface ProfileEditRequest {
    fullName?: string;
    bio?: string;
    address?: string;
    age?: string;
    about?: string;
    gender?: string;
    phone?: string;
    skills?: string[];
    socials?: {
        facebook?: string;
        linkedin?: string;
        github?: string;
    };
}

export interface ProfileEditResponse {}

export const candidateProfileEdit = async (data: FormData): Promise<any> => {
  const response = await apiClient.post("/candidate/edit", data, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const candidateMe = async () => {
    const response = await apiClient.get("/candidate/me");
    return response.data;
}

export const candidateList = async () => {
    const response = await apiClient.get("/candidate/list", {
        userType: "company",
      } as CustomAxiosRequestConfig);
    return response.data;
}

export const candidateById = async (id: string) => {
    const response = await apiClient.get(`/candidate/${id}`, {
        userType: "company",
      } as CustomAxiosRequestConfig);
    return response.data;
}