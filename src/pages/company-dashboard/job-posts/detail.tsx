import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";
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
import { CustomerBasicDetails } from "src/sections/company-dashboard/customer/customer-basic-details";
import { CustomerDataManagement } from "src/sections/company-dashboard/customer/customer-data-management";
import { CustomerEmailsSummary } from "src/sections/company-dashboard/customer/customer-emails-summary";
import { CustomerInvoices } from "src/sections/company-dashboard/customer/customer-invoices";
import { CustomerPayment } from "src/sections/company-dashboard/customer/customer-payment";
import { CustomerLogs } from "src/sections/company-dashboard/customer/customer-logs";
import type { Customer } from "src/types/customer";
import { CustomerInvoice, CustomerLog } from "src/types/customer";
import { getInitials } from "src/utils/get-initials";
import { useJobPostGetById } from "src/hooks/jop-post/use-job-post";
import { JobBasicDetails } from "src/sections/company-dashboard/job-posts/job-basic-details";
import { JobDescription } from "src/sections/company-dashboard/job-posts/job-description";

const useCustomer = (): Customer | null => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState<Customer | null>(null);

  const handleCustomerGet = useCallback(async () => {
    try {
      const response = await customersApi.getCustomer();

      if (isMounted()) {
        setCustomer(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    handleCustomerGet();
  }, []);

  return customer;
};

const Page = () => {
  const customer = useCustomer();

  const { jobPostId } = useParams();
  console.log(jobPostId);

  if (!jobPostId) {
    return null;
  }

  const { data: job } = useJobPostGetById(jobPostId);

  usePageView();

  if (!job) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Customer Details" />
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
                    <Typography variant="h4">{job.role}</Typography>
                    {/* <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">user_id:</Typography>
                      <Chip label={customer.id} size="small" />
                    </Stack> */}
                  </Stack>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Button
                    color="inherit"
                    component={RouterLink}
                    endIcon={
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    }
                    href={`${paths.companyDashboard.jobPosts.edit}/${job._id}`}
                  >
                    Edit
                  </Button>
                  {/* <Button
                    endIcon={
                      <SvgIcon>
                        <ChevronDownIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Actions
                  </Button> */}
                </Stack>
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
