import type { ChangeEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import { customersApi } from "src/api/customers";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import type { Customer } from "src/types/customer";
import { CustomerInvoice, CustomerLog } from "src/types/customer";
import { getInitials } from "src/utils/get-initials";
import { useJobPostGetByIdForCandidate } from "src/hooks/jop-post/use-job-post";
import { JobBasicDetails } from "src/sections/company-dashboard/job-posts/job-basic-details";
import { JobDescription } from "src/sections/company-dashboard/job-posts/job-description";
import { useCandidateMe } from "src/hooks/auth/use-candidate-auth";
import {
  useJobApplicationApply,
  useJobApplicationsByCandidate,
} from "src/hooks/job-application/use-job-application";
import toast from "react-hot-toast";

const Page = () => {
  const { jobId } = useParams();

  if (!jobId) {
    return null;
  }
  const { data: job } = useJobPostGetByIdForCandidate(jobId);
  const { data: candidateResponse } = useCandidateMe();

  const { mutate: applyToJob } = useJobApplicationApply();

  const { data: userApplicationsRes } = useJobApplicationsByCandidate(
    candidateResponse?.candidate?._id
  );
  const appliedJobs = useMemo(() => {
    if (userApplicationsRes?.data) {
      return userApplicationsRes?.data?.map((item: any) => item.job);
    }
    return [];
  }, [userApplicationsRes]);

  console.log(appliedJobs)

  const apply = () => {
    console.log(job._id, job?.company, candidateResponse?.candidate?._id)
    if (job?._id && job?.company && candidateResponse?.candidate?._id) {
      applyToJob({
        job: job?._id,
        candidate: candidateResponse?.candidate._id,
        company: job?.company,
      });
    } else {
      toast.error("Error occured, pls try again later");
    }
  };

  usePageView();

  if (!job) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Job Details" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.candidateDashboard.jobs.recommended}
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">Job Posts</Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: "column",
                  md: "row",
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Stack spacing={1}>
                    <Typography variant="h4">{job?.role}</Typography>
                    {/* <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">user_id:</Typography>
                      <Chip label={customer.id} size="small" />
                    </Stack> */}
                  </Stack>
                </Stack>
                {appliedJobs.includes(job?._id) ? (
                  <Stack alignItems="center" direction="row" spacing={2}>
                    <Button variant="contained" onClick={() => {}}>
                      Already Applied
                    </Button>
                  </Stack>
                ) : (
                  <Stack alignItems="center" direction="row" spacing={2}>
                    <Button variant="contained" onClick={apply}>
                      Apply to this Job
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Stack>
            <div>
              <Grid container spacing={4}>
                <Grid xs={12} lg={4}>
                  <JobBasicDetails
                    jobRole={job?.role}
                    minimumSalary={job?.minimumSalary}
                    maximumSalary={job?.maximumSalary}
                    payingCurrency={job?.payingCurrency}
                    jobType={job?.jobType}
                    isAcceptingApplications={!!job?.isAcceptingApplications}
                  />
                </Grid>
                <Grid xs={12} lg={8}>
                  <Stack spacing={4}>
                    <JobDescription description={job?.description} />
                  </Stack>
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
