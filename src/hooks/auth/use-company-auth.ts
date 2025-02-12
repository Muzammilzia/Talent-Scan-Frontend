import {
    companyMe,
    companySignin,
    companySignup,
  } from "src/api/auth-company";
  import { useGenericMutation } from "../use-generic-mutation";
  import { useRouter } from "../use-router";
  import { paths } from "src/paths";
  import { serverKeys } from "src/api/serverKey";
  import { COMPANY_TOKEN_KEY } from "src/api/axios";
  import { useQuery } from "@tanstack/react-query";
  
  export const useCompanySignup = () => {
    const router = useRouter();
  
    return useGenericMutation({
      serviceFunction: companySignup,
      onSuccess: (data) => {
        router.push(paths.auth.company.login);
      },
    });
  };
  
  export const useCompanySignIn = () => {
    const router = useRouter();
  
    return useGenericMutation({
      serviceFunction: companySignin,
      onSuccess: (response) => {
        localStorage.setItem(COMPANY_TOKEN_KEY, response.data.token);
        router.push(paths.companyDashboard.index)
      },
      queryKey: [serverKeys.companyMe],
    });
  };
  
  export const useCompanyMe = () => {
    return useQuery({ queryFn: companyMe, queryKey: [serverKeys.companyMe] });
  };
  