import {
  jobPostCreate,
  jobPostEdit,
  JobPostEditRequest,
  jobPostList,
  jobPostListByCompanyId,
  jobPostListGetById,
} from "src/api/job-post";
import { useGenericMutation } from "../use-generic-mutation";
import { useRouter } from "../use-router";
import { paths } from "src/paths";
import { serverKeys } from "src/api/serverKey";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useJobPostCreate = () => {
  const router = useRouter();

  return useGenericMutation({
    serviceFunction: jobPostCreate,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Job created successfully");
      router.push(paths.companyDashboard.jobPosts.index);
    },
    queryKey: [serverKeys.jobPostList, serverKeys.jobPostListByCompany],
  });
};

export const useJobPostEdit = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useGenericMutation({
    serviceFunction: jobPostEdit,
    onSuccess: (data, variables) => {
      console.log(data, variables);
      toast.success("Job updated successfully");

      queryClient.invalidateQueries({ queryKey: [serverKeys.jobPostList] }); // Invalidate all job posts
      queryClient.invalidateQueries({
        queryKey: [serverKeys.jobPostListByCompany, variables.company],
      }); // Invalidate company job list
      queryClient.invalidateQueries({
        queryKey: [serverKeys.jobPostGetById, variables._id],
      });

      router.push(paths.companyDashboard.jobPosts.index);
    },
    queryKey: [
      serverKeys.jobPostList,
      serverKeys.jobPostListByCompany,
      serverKeys.jobPostGetById,
    ],
  });
};

export const useJobPostListByCompany = (companyId: string) => {
  return useQuery({
    queryFn: () => jobPostListByCompanyId(companyId),
    queryKey: [
      serverKeys.jobPostList,
      serverKeys.jobPostListByCompany,
      companyId,
    ],
  });
};

export const useJobPostListAll = () => {
  return useQuery({ queryFn: jobPostList, queryKey: [serverKeys.jobPostList] });
};
export const useJobPostGetById = (jobId: string) => {
  return useQuery({
    queryFn: () => jobPostListGetById(jobId),
    queryKey: [serverKeys.jobPostGetById, jobId],
  });
};
