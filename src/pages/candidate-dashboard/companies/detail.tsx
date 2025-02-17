import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import MessageChatSquareIcon from "@untitled-ui/icons-react/build/esm/MessageChatSquare";
import EditIcon from "@untitled-ui/icons-react/build/esm/Edit01";
import DotsHorizontalIcon from "@untitled-ui/icons-react/build/esm/DotsHorizontal";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import UserPlus02Icon from "@untitled-ui/icons-react/build/esm/UserPlus02";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { blueGrey } from "@mui/material/colors";

import { socialApi } from "src/api/social";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { paths } from "src/paths";
import type { Profile } from "src/types/social";
import Grid from "@mui/system/Unstable_Grid";
import { Card, CardActions, CardHeader } from "@mui/material";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";
import { useCandidateMe } from "src/hooks/auth/use-candidate-auth";
import { BACKEND_URL } from "src/api/axios";
import { useCompanyById, useCompanyMe } from "src/hooks/auth/use-company-auth";
import { useParams } from "react-router";

const useProfile = (): Profile | null => {
  const isMounted = useMounted();
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleProfileGet = useCallback(async () => {
    try {
      const response = await socialApi.getProfile();

      if (isMounted()) {
        setProfile(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    handleProfileGet();
  }, []);

  return profile;
};

const Page = () => {
  const profile = useProfile();
  const { companyId } = useParams()
  if(!companyId){
    return null
  }
  const { data: data } = useCompanyById(companyId);
  console.log(data);

  usePageView();

  if (!profile) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Profile" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <div>
            <Box
              style={{ backgroundImage: `url(${profile.cover})` }}
              sx={{
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: 1,
                height: 348,
                position: "relative",
                "&:hover": {
                  "& button": {
                    visibility: "visible",
                  },
                },
              }}
            >
              {/* <Button
                startIcon={
                  <SvgIcon>
                    <Image01Icon />
                  </SvgIcon>
                }
                sx={{
                  backgroundColor: blueGrey[900],
                  bottom: {
                    lg: 24,
                    xs: "auto",
                  },
                  color: "common.white",
                  position: "absolute",
                  right: 24,
                  top: {
                    lg: "auto",
                    xs: 24,
                  },
                  visibility: "hidden",
                  "&:hover": {
                    backgroundColor: blueGrey[900],
                  },
                }}
                variant="contained"
              >
                Change Cover
              </Button> */}
            </Box>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 5 }}
            >
              <Stack alignItems="center" direction="row" spacing={2}>
                <Avatar
                  src={profile.avatar}
                  sx={{
                    height: 64,
                    width: 64,
                  }}
                />
                <div>
                  <Typography variant="h6">
                    {data?.company?.name}
                  </Typography>
                  <Typography color="text.secondary" variant="overline">
                    {data?.company?.email}
                  </Typography>
                </div>
              </Stack>
              <Box sx={{ flexGrow: 1 }} />
            </Stack>
          </div>
          <Divider sx={{ mt: 3 }} />
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={4}>
              <Grid xs={12}>
                <Card sx={{ display: "flex" }}>
                  <CardHeader
                    sx={{
                      width: "fit-content",
                      padding: "8px 8px 8px 24px !important",
                    }}
                    title="Social Profiles"
                  />
                  <CardActions sx={{ width: "fit-content" }}>
                    <IconButton
                      component={"a"}
                      href={data?.company?.socials.facebook}
                      target="_blank"
                    >
                      <SvgIcon>
                        <FacebookIcon />
                      </SvgIcon>
                    </IconButton>
                    <IconButton
                      component={"a"}
                      href={data?.company?.socials.github}
                      target="_blank"
                    >
                      <SvgIcon>
                        <GitHubIcon />
                      </SvgIcon>
                    </IconButton>
                    <IconButton
                      component={"a"}
                      href={data?.company?.socials.linkedin}
                      target="_blank"
                    >
                      <SvgIcon>
                        <LinkedInIcon />
                      </SvgIcon>
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
              <Grid container xs={12} lg={4} spacing={4}>
                <Grid xs={12}>
                  <Card>
                    <CardHeader title="Basic Details" />
                    <PropertyList>
                      <PropertyListItem
                        divider
                        label="Name"
                        value={data?.company?.name || "Not Provided"}
                      />
                      <PropertyListItem
                        label="Total Employees"
                        value={data?.company?.totalEmployees || "Not Provided"}
                      />
                    </PropertyList>
                  </Card>
                </Grid>
                <Grid xs={12}>
                  <Card>
                    <CardHeader title="Contact Information" />
                    <PropertyList>
                      <PropertyListItem
                        divider
                        label="Phone"
                        value={data?.company?.phone || "Not Provided"}
                      />
                      <PropertyListItem
                        divider
                        label="Email"
                        value={data?.company?.email || "Not Provided"}
                      />
                      <PropertyListItem
                        label="Address"
                        value={data?.company?.address || "Not Provided"}
                      />
                    </PropertyList>
                  </Card>
                </Grid>
              </Grid>
              <Grid container xs={12} lg={8} spacing={4}>
                <Grid xs={12}>
                  <Card>
                    <CardHeader title="Professional Summary" />
                    <PropertyList>
                      <PropertyListItem
                        label="About"
                        value={data?.company?.about || "Not Provided"}
                      />
                    </PropertyList>
                  </Card>
                </Grid>
                {/* <Grid xs={12}>
                  <Card>
                    <CardHeader title="Qualification" />
                    <PropertyList>
                      <PropertyListItem
                        divider
                        label="Metropolis University"
                        value={
                          "Master of Information Technology (2015-09-01 - 2017-06-01)"
                        }
                      />
                      <PropertyListItem
                        divider
                        label="Metropolis University"
                        value={
                          "Master of Information Technology (2015-09-01 - 2017-06-01)"
                        }
                      />
                    </PropertyList>
                  </Card>
                </Grid> */}
              </Grid>
              {/* <Grid container xs={12} lg={12}>
                <Grid xs={12}>
                  <Card>
                    <CardHeader title="Work Experience" />
                    <PropertyList>
                      <PropertyListItem
                        divider
                        label="Metropolis University"
                        value={
                          "Master of Information Technology (2015-09-01 - 2017-06-01)"
                        }
                      />
                      <PropertyListItem
                        label="Metropolis University"
                        value={
                          "Master of Information Technology (2015-09-01 - 2017-06-01)"
                        }
                      />
                    </PropertyList>
                  </Card>
                </Grid>
              </Grid> */}
            </Grid>
            {/* <SocialTimeline
              posts={posts}
              profile={profile}
            /> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
