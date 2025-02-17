import {
  jobPostCreate,
  jobPostEdit,
  JobPostEditRequest,
  jobPostList,
  jobPostListByCompanyId,
  jobPostListCandidate,
  jobPostListGetById,
  jobPostListGetByIdForCandidate,
  jobPostRecommendedListCandidate,
} from "src/api/job-post";
import { useGenericMutation } from "../use-generic-mutation";
import { useRouter } from "../use-router";
import { paths } from "src/paths";
import { serverKeys } from "src/api/serverKey";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  jobApplicationApply,
  jobApplicationListByCandidate,
  jobApplicationListByCompany,
  jobApplicationListByCompanyAndJob,
} from "src/api/job-application";

export const useJobApplicationApply = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useGenericMutation({
    serviceFunction: jobApplicationApply,
    onSuccess: (data, variables) => {
      console.log(data, variables.candidate);
      queryClient.invalidateQueries({
        queryKey: [
          serverKeys.jobApplicationListByCandidate,
          `${variables.candidate}-candidate-applications`,
        ],
      });
      toast.success("Applied for Job successfully");
      router.push(paths.candidateDashboard.jobs.recommended);
    },
    queryKey: [serverKeys.jobApplicationListByCandidate],
  });
};

export const useJobApplicationsByCandidate = (candidateId: string) => {
  return useQuery({
    queryFn: () => jobApplicationListByCandidate(candidateId),
    queryKey: [
      serverKeys.jobApplicationListByCandidate,
      `${candidateId}-candidate-applications`,
    ],
  });
};

export const useJobApplicationsByCompanyAndJob = (jobId: string) => {
  return useQuery({
    queryFn: () => jobApplicationListByCompanyAndJob(jobId),
    queryKey: [
      serverKeys.jobApplicationListByCompanyAndJob,
      `${jobId}-job-applications`,
    ],
  });
};
