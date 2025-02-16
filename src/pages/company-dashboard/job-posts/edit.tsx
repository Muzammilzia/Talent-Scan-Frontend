import { useCallback, useEffect, useState } from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import { JobPostCreateForm } from "src/sections/company-dashboard/job-posts/job-post-create-form";
import { useParams } from "react-router";
import { useJobPostGetById } from "src/hooks/jop-post/use-job-post";

const Page = () => {
  const { jobPostId } = useParams();
  if (!jobPostId) {
    return null
  }

  const { data: job } = useJobPostGetById(jobPostId);
  usePageView();

  return (
    <>
      <Seo title="Dashboard: Customer Edit" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.companyDashboard.jobPosts.index}
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
            </Stack>
            <JobPostCreateForm job={job} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
