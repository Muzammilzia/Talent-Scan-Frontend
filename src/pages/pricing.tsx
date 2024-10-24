import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { PricingPlan } from 'src/sections/pricing/pricing-plan';
import { PricingPlanIcon } from 'src/sections/pricing/pricing-plan-icon';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Page = () => {

  usePageView();

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.has("token")) {
      console.log(location.search.split("=")[1]);
      window.localStorage.setItem("temp_token", location.search.split("=")[1]);
      queryParams.delete("token");
      navigate("/pricing");

    }
  }, []);

  return (
    <>
      <Seo title="Pricing" />
      <Box
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.mode === 'dark'
              ? 'neutral.800'
              : 'neutral.50',
            pb: '120px',
            pt: '184px'
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                mb: 4
              }}
            >
              <Typography variant="h3">
                Start today. Empower your team!
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ my: 2 }}
                variant="body1"
              >
                Join CEOs, COOs, and operations teams in using Operating PRO to power modern businesses.
              </Typography>
              {/* <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Switch checked />
                <Typography variant="body1">
                  Yearly Payment
                </Typography>
                <Chip
                  color="primary"
                  label="25% OFF"
                  size="small"
                />
              </Stack> */}
            </Box>
            <Grid
              container
              spacing={4}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Grid
                xs={12}
                md={4}
              >
                <PricingPlan
                  cta="Start 45-day Free Trial"
                  currency="$"
                  description="To familiarize yourself with our tools."
                  features={[
                    'Upto 50 of your team',
                    'Upto 5 group entities',
                    'Group structure mapping',
                    'Global org chart',
                    'Regulatory calendar',
                    'Transfer pricing',
                    'Process mapping',
                    'Document Management',
                    'Policies',
                    'Supply Chain Management',
                    'Customer support',
                    'Fixed Asset Register',
                    'Project Management',
                  ]}
                  icon={<PricingPlanIcon name="standard" />}
                  name="Business PRO"
                  popular
                  price="990"
                  period='year'
                  plan='business'
                  sx={{
                    height: '100%',
                    maxWidth: 460,
                    mx: 'auto'
                  }}
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
              >
                <PricingPlan
                  cta="Start 45-day Free Trial"
                  currency="$"
                  description="To familiarize yourself with our tools."
                  features={[
                    'All of Business PRO',
                    'Up to 150 of your team',
                    'Up to 15 group entities',
                    'Priority support from us',
                    'Enterprise Transfer pricing',
                    'Sales Force Automation',
                    'Financial Management',
                    'Business Intelligence',
                    'Dynamic reallocation',
                  ]}
                  icon={<PricingPlanIcon name="business" />}
                  name="Enterprise PRO"
                  price="1,990"
                  period='year'
                  popular
                  plan='enterprise'
                  sx={{
                    height: '100%',
                    maxWidth: 460,
                    mx: 'auto'
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4 }}>
              <Typography
                align="center"
                color="text.secondary"
                component="p"
                variant="caption"
              >
                No credit card required
              </Typography>
            </Box>
          </Container>
        </Box>
        <Divider />
        {/* <PricingFaqs /> */}
      </Box>
    </>
  );
};

export default Page;
