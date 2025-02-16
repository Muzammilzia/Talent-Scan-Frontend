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
import { ProfileEditForm } from "src/sections/company-dashboard/profile/profile-edit-form";

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title="Dashboard: Profile Edit" />
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
                  href={paths.companyDashboard.profile.index}
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">Profile</Typography>
                </Link>
              </div>
            </Stack>
            <ProfileEditForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
