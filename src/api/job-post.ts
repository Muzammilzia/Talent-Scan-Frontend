import apiClient, { CustomAxiosRequestConfig } from "./axios";

export enum JobType {
  FULL_TIME = "full time",
  PART_TIME = "part time",
  ONSITE = "onsite",
  REMOTE = "remote",
  HYBRID = "hybrid",
  LONG_TERM = "long term",
  CONTRACT = "contract",
}

export interface JobPostCreateRequest {
  company: string;
  role: string;
  minimumSalary: string;
  maximumSalary: string;
  payingCurrency: string;
  description: string;
  jobType: JobType;
  isAcceptingApplications: boolean;
}
export interface JobPostCreateResponse {
  // needs to be implemented
}

export const jobPostCreate = async (
  data: JobPostCreateRequest
): Promise<any> => {
  const response = await apiClient.post("/job-post/create", data, {
    userType: "company",
  } as CustomAxiosRequestConfig);
  return response.data;
};

export interface JobPostEditRequest {
  _id: string;
  company: string;
  role?: string;
  minimumSalary?: string;
  maximumSalary?: string;
  payingCurrency?: string;
  description?: string;
  jobType?: JobType;
  isAcceptingApplications?: boolean;
}
export interface JobPostEditResponse {
  // needs to be implemented
}

export const jobPostEdit = async (
  data: JobPostEditRequest
): Promise<any> => {
  const response = await apiClient.post("/job-post/edit", data, {
    userType: "company",
  } as CustomAxiosRequestConfig);
  return response.data;
};

export const jobPostList = async () => {
  const response = await apiClient.get("/job-post/list", {
    userType: "company",
  } as CustomAxiosRequestConfig);
  return response.data;
};

export const jobPostListByCompanyId = async (companyId: string) => {
  if (!companyId) return;
  const response = await apiClient.get(
    `/job-post/list-by-company-id/${companyId}`,
    {
      userType: "company",
    } as CustomAxiosRequestConfig
  );
  return response.data;
};

export const jobPostListGetById = async (jobId: string) => {
  const response = await apiClient.get(`/job-post/${jobId}`, {
    userType: "company",
  } as CustomAxiosRequestConfig);
  return response.data;
};

export const jobPostListGetByIdForCandidate = async (jobId: string) => {
  const response = await apiClient.get(`/job-post/${jobId}`);
  return response.data;
};

export const jobPostListCandidate = async () => {
    const response = await apiClient.get("/job-post/list");
    return response.data;
  };

export const jobPostRecommendedListCandidate = async () => {
    const response = await apiClient.get("/job-post/recommended_list");
    return response.data;
  };
