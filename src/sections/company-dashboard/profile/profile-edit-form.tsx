import { useEffect, useState, type FC } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import UploadIcon from "@untitled-ui/icons-react/build/esm/Upload01";
import FileIcon from "@untitled-ui/icons-react/build/esm/FileAttachment01";
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
import { MenuItem, SvgIcon, TextareaAutosize } from "@mui/material";
import {
  useJobPostCreate,
  useJobPostEdit,
} from "src/hooks/jop-post/use-job-post";
import {
  useCompanyMe,
  useCompanyProfileEdit,
} from "src/hooks/auth/use-company-auth";
import {
  useCandidateMe,
  useCandidateProfileEdit,
} from "src/hooks/auth/use-candidate-auth";
import { FileDropzone } from "src/components/file-dropzone";

interface GenderOption {
  label: string;
  value: string;
}
const genderOptions: GenderOption[] = [
  {
    label: "",
    value: "",
  },
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

interface ProfileEditFormProps {}

export const ProfileEditForm: FC<ProfileEditFormProps> = (props) => {
  const { ...other } = props;

  const { mutate: companyProfileEdit } = useCompanyProfileEdit();
  const { data } = useCompanyMe();

  console.log(data);

  const formik = useFormik<{
    name: string;
    totalEmployees: number;
    address: string;
    about: string;
    phone: string;
    facebook: string;
    linkedin: string;
    github: string;
    submit: null;
  }>({
    enableReinitialize: true,
    initialValues: {
      name: data?.company?.name || "",
      totalEmployees: data?.company?.bio || 0,
      address: data?.company?.address || "",
      about: data?.company?.about || "",
      phone: data?.company?.phone || "",
      facebook: data?.company?.socials?.facebook || "",
      linkedin: data?.company?.socials?.linkedin || "",
      github: data?.company?.socials?.github || "",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      totalEmployees: Yup.number(),
      address: Yup.string(),
      about: Yup.string(),
      phone: Yup.string(),
      facebook: Yup.string().url(),
      linkedin: Yup.string().url(),
      github: Yup.string().url(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      console.log(values);
      const updatedData = {
        name: values.name,
        totalEmployees: values.totalEmployees,
        address: values.address,
        about: values.about,
        phone: values.phone,
        socials: {
          facebook: values.facebook,
          linkedin: values.linkedin,
          github: values.github,
        },
      };

      companyProfileEdit(updatedData);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Edit your profile" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                label="Full Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(
                    formik.touched.totalEmployees &&
                    formik.errors.totalEmployees
                  )
                }
                fullWidth
                label="Total Employees / Company Size"
                name="totalEmployees"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.totalEmployees}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.address && formik.errors.address)}
                fullWidth
                label="Address"
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.phone && formik.errors.phone)}
                fullWidth
                label="Phone"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.facebook && formik.errors.facebook)}
                fullWidth
                label="Facebook Profile Link"
                name="facebook"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.facebook}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.github && formik.errors.github)}
                fullWidth
                label="Github Profile Link"
                name="github"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.github}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.linkedin && formik.errors.linkedin)}
                fullWidth
                label="Linkedin Profile Link"
                name="linkedin"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.linkedin}
              />
            </Grid>
            <Grid xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                About
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
                    formik.touched.about && formik.errors.about
                      ? "red"
                      : "#2970FF",
                }}
                name="about"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.about}
              />
              {formik.touched.about && formik.errors.about && (
                <Typography color="error" variant="body2">
                  {formik.errors.about}
                </Typography>
              )}
            </Grid>
          </Grid>
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
            Update
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

ProfileEditForm.propTypes = {};
