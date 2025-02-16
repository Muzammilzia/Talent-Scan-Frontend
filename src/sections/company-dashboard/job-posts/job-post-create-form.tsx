import { useEffect, useState, type FC } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import type { Customer } from "src/types/customer";
import { wait } from "src/utils/wait";
import { MenuItem, TextareaAutosize } from "@mui/material";
import {
  useJobPostCreate,
  useJobPostEdit,
} from "src/hooks/jop-post/use-job-post";
import { useCompanyMe } from "src/hooks/auth/use-company-auth";
import { JobType } from "src/api/job-post";

interface JobTypeOption {
  label: string;
  value: string;
}
const jobTypeOptions: JobTypeOption[] = [
  {
    label: "Full Time",
    value: JobType.FULL_TIME,
  },
  {
    label: "Part Time",
    value: JobType.PART_TIME,
  },
  {
    label: "Onsite",
    value: JobType.ONSITE,
  },
  {
    label: "Remote",
    value: JobType.REMOTE,
  },
  {
    label: "Hybrid",
    value: JobType.HYBRID,
  },
  {
    label: "Long Term",
    value: JobType.LONG_TERM,
  },
  {
    label: "Contract",
    value: JobType.CONTRACT,
  },
];

interface JobPostCreateFormProps {
  job?: any;
}

export const JobPostCreateForm: FC<JobPostCreateFormProps> = (props) => {
  const { job, ...other } = props;

  const { mutate: createJobPost } = useJobPostCreate();
  const { mutate: editJobPost } = useJobPostEdit();
  const { data } = useCompanyMe();

  const formik = useFormik<{
    company: string;
    role: string;
    minimumSalary: string;
    maximumSalary: string;
    payingCurrency: string;
    description: string;
    jobType: JobType;
    isAcceptingApplications: boolean;
    submit: null;
  }>({
    enableReinitialize: true,
    initialValues: {
      company: data?.company?._id || "",
      role: job?.role || "",
      minimumSalary: job?.minimumSalary || "",
      maximumSalary: job?.maximumSalary || "",
      payingCurrency: job?.payingCurrency || "",
      description: job?.description || "",
      jobType: job?.jobType || "",
      isAcceptingApplications: job?.isAcceptingApplications || true,
      submit: null,
    },
    validationSchema: Yup.object({
      role: Yup.string(),
      minimumSalary: Yup.string(),
      maximumSalary: Yup.string(),
      payingCurrency: Yup.string(),
      description: Yup.string(),
      jobType: Yup.string(),
      isAcceptingApplications: Yup.bool(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      if (job) {
        editJobPost({ ...values, _id: job?._id });
      } else {
        createJobPost(values);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Create new job post" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12}>
              <TextField
                error={!!(formik.touched.role && formik.errors.role)}
                fullWidth
                label="Job Role / Title"
                name="role"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.role}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(
                    formik.touched.minimumSalary && formik.errors.minimumSalary
                  )
                }
                fullWidth
                label="Minimum Salary"
                name="minimumSalary"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.minimumSalary}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(
                    formik.touched.maximumSalary && formik.errors.maximumSalary
                  )
                }
                fullWidth
                label="Maximum Salary"
                name="maximumSalary"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.maximumSalary}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(
                    formik.touched.payingCurrency &&
                    formik.errors.payingCurrency
                  )
                }
                fullWidth
                label="Paying Currency"
                name="payingCurrency"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.payingCurrency}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.jobType && formik.errors.jobType)}
                fullWidth
                label="Job Type"
                name="jobType"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                value={formik.values.jobType}
              >
                {jobTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Description
              </Typography>
              <TextareaAutosize
                minRows={12}
                style={{
                  resize: "none",
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  borderColor:
                    formik.touched.description && formik.errors.description
                      ? "red"
                      : "#2970FF",
                }}
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <Typography color="error" variant="body2">
                  {formik.errors.description}
                </Typography>
              )}
            </Grid>

            {/* <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="description"
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Grid> */}
          </Grid>
          <Stack divider={<Divider />} spacing={3} sx={{ mt: 3 }}>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="flex-start"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography gutterBottom variant="subtitle1">
                  Accepting Applications
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Disable this if you are no longer accepting applications
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.isAcceptingApplications}
                color="primary"
                edge="start"
                name="isAcceptingApplications"
                onChange={formik.handleChange}
                value={formik.values.isAcceptingApplications}
              />
            </Stack>
            {/* <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography gutterBottom variant="subtitle1">
                  Available to hire
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Toggling this will let your teammates know that you are
                  available for acquiring new projects
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.hasDiscount}
                color="primary"
                edge="start"
                name="hasDiscount"
                onChange={formik.handleChange}
                value={formik.values.hasDiscount}
              />
            </Stack> */}
          </Stack>
        </CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            {job ? "Update" : "Create"}
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.dashboard.customers.details}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

JobPostCreateForm.propTypes = {};
