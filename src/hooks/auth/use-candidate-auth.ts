import {
  candidateById,
  candidateList,
  candidateMe,
  candidateProfileEdit,
  candidateSignin,
  candidateSignup,
} from "src/api/auth-candidate";
import { useGenericMutation } from "../use-generic-mutation";
import { useRouter } from "../use-router";
import { paths } from "src/paths";
import { serverKeys } from "src/api/serverKey";
import { CANDIDATE_TOKEN_KEY } from "src/api/axios";
import { useQuery } from "@tanstack/react-query";

export const useCandidateSignup = () => {
  const router = useRouter();

  return useGenericMutation({
    serviceFunction: candidateSignup,
    onSuccess: (data) => {
      router.push(paths.auth.candidate.login);
    },
  });
};

export const useCandidateSignIn = () => {
  const router = useRouter();

  return useGenericMutation({
    serviceFunction: candidateSignin,
    onSuccess: (response) => {
      localStorage.setItem(CANDIDATE_TOKEN_KEY, response.data.token);
      router.push(paths.candidateDashboard.index)
    },
    queryKey: [serverKeys.candidateMe],
  });
};

export const useCandidateProfileEdit = () => {
  const router = useRouter();

  return useGenericMutation({
    serviceFunction: candidateProfileEdit,
    onSuccess: (response) => {
      router.push(paths.candidateDashboard.profile.index)
    },
    queryKey: [serverKeys.candidateMe],
  });
};

export const useCandidateMe = () => {
  return useQuery({ queryFn: candidateMe, queryKey: [serverKeys.candidateMe] });
};

export const useCandidateById = (id: string) => {
  return useQuery({ queryFn: () => candidateById(id), queryKey: [serverKeys.candidateById, `${id}-candidate-details`] });
};

export const useCandidateList = () => {
  return useQuery({ queryFn: candidateList, queryKey: [serverKeys.candidateList] });
}