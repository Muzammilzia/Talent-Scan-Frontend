import apiClient, { CustomAxiosRequestConfig } from "./axios";

export interface JobApplicationApplyRequest {
  company: string;
  candidate: string;
  job: string;
}
export interface JobPostCreateResponse {
  // needs to be implemented
}
export const jobApplicationApply = async (
  data: JobApplicationApplyRequest
): Promise<any> => {
  const response = await apiClient.post("/job-application/apply", data);
  return response.data;
};

export const jobApplicationListByCandidate = async (
  id: string
): Promise<any> => {
  const response = await apiClient.get(`/job-application/get-by-candidate/${id}`);
  return response.data;
};

export const jobApplicationListByCompany = async (
  id: string
): Promise<any> => {
  const response = await apiClient.get(`/job-application/get-by-company/${id}`);
  return response.data;
};

export const jobApplicationListByCompanyAndJob = async (
  id: string
): Promise<any> => {
  const response = await apiClient.get(`/job-application/get-by-company-and-job/${id}`, {
    userType: "company",
  } as CustomAxiosRequestConfig);
  return response.data;
};
