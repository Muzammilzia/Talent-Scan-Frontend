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
import { useCompanyMe } from "src/hooks/auth/use-company-auth";
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

export const CandidateProfileEditForm: FC<ProfileEditFormProps> = (props) => {
  const { ...other } = props;

  //   const { mutate: createJobPost } = useJobPostCreate();
  const { mutate: candidateProfileEdit } = useCandidateProfileEdit();
  const { data } = useCandidateMe();

  const [files, setFiles] = useState<File[]>([]);
  const [uploadNewFile, setUploadNewFile] = useState<boolean>(false);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const handleRemove = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  console.log(data);

  const formik = useFormik<{
    fullName: string;
    bio: string;
    address: string;
    age: string;
    about: string;
    gender: string;
    phone: string;
    skills: string;
    facebook: string;
    linkedin: string;
    github: string;
    isAcceptingApplications: boolean;
    submit: null;
  }>({
    enableReinitialize: true,
    initialValues: {
      fullName: data?.candidate?.fullName || "",
      bio: data?.candidate?.bio || "",
      address: data?.candidate?.address || "",
      age: data?.candidate?.age || "",
      about: data?.candidate?.about || "",
      gender: data?.candidate?.gender || "",
      phone: data?.candidate?.phone || "",
      skills: data?.candidate?.skills?.join(", ") || "",
      facebook: data?.candidate?.socials?.facebook || "",
      linkedin: data?.candidate?.socials?.linkedin || "",
      github: data?.candidate?.socials?.github || "",
      isAcceptingApplications: true,
      submit: null,
    },
    validationSchema: Yup.object({
      fullName: Yup.string(),
      bio: Yup.string(),
      address: Yup.string(),
      age: Yup.string(),
      about: Yup.string(),
      gender: Yup.string(),
      phone: Yup.string(),
      skills: Yup.string(),
      facebook: Yup.string().url(),
      linkedin: Yup.string().url(),
      github: Yup.string().url(),
      isAcceptingApplications: Yup.bool(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("bio", values.bio);
      formData.append("address", values.address);
      formData.append("age", values.age);
      formData.append("about", values.about);
      formData.append("gender", values.gender);
      formData.append("phone", values.phone);
      formData.append(
        "skills",
        JSON.stringify(
          values.skills
            ? values.skills.split(",").map((skill) => skill.trim())
            : []
        )
      );
      formData.append(
        "socials",
        JSON.stringify({
          facebook: values.facebook,
          linkedin: values.linkedin,
          github: values.github,
        })
      );
      if (files[0]) {
        formData.append("resume", files[0]);
      }

      console.log(data);
      candidateProfileEdit(formData);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Edit your profile" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12}>
              {data?.candidate?.resume ? (
                <>
                  {uploadNewFile ? (
                    <FileDropzone
                      files={files}
                      onRemove={handleRemove}
                      // onRemoveAll={handleRemoveAll}
                      // onUpload={handleUpload}
                      onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
                      caption="Upload your resume or CV. Accepted formats: PDF, DOC, DOCX."
                      accept={{
                        "application/pdf": [".pdf"],
                        "application/msword": [".doc"],
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                          [".docx"],
                      }}
                      numberOfFilesAllowed={1}
                      maxSize={10485760} // 10 MB
                    />
                  ) : (
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                      sx={{
                        display: {
                          md: "block",
                          xs: "none",
                        },
                      }}
                    >
                      <Button
                        component={"a"}
                        href={data?.candidate?.resume}
                        target="_blank"
                        size="small"
                        startIcon={
                          <SvgIcon>
                            <FileIcon />
                          </SvgIcon>
                        }
                        variant="contained"
                      >
                        See Resume
                      </Button>
                      <Button
                        size="small"
                        onClick={() => setUploadNewFile(true)}
                        startIcon={
                          <SvgIcon>
                            <UploadIcon />
                          </SvgIcon>
                        }
                        variant="contained"
                      >
                        Upload New Resume
                      </Button>
                    </Stack>
                  )}
                </>
              ) : (
                <FileDropzone
                  files={files}
                  onRemove={handleRemove}
                  // onRemoveAll={handleRemoveAll}
                  // onUpload={handleUpload}
                  onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
                  caption="Upload your resume or CV. Accepted formats: PDF, DOC, DOCX."
                  accept={{
                    "application/pdf": [".pdf"],
                    "application/msword": [".doc"],
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                      [".docx"],
                  }}
                  numberOfFilesAllowed={1}
                  maxSize={10485760} // 10 MB
                />
              )}
            </Grid>
            <Grid xs={12}>
              <TextField
                error={!!(formik.touched.fullName && formik.errors.fullName)}
                fullWidth
                label="Full Name"
                name="fullName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.fullName}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.bio && formik.errors.bio)}
                fullWidth
                label="Bio"
                placeholder="Full Stack Developer"
                name="bio"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.bio}
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
                error={!!(formik.touched.age && formik.errors.age)}
                fullWidth
                label="Age"
                name="age"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.age}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.gender && formik.errors.gender)}
                fullWidth
                label="Gender"
                name="gender"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                value={formik.values.gender}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
                error={!!(formik.touched.skills && formik.errors.skills)}
                fullWidth
                label="Skills (Comma Separated)"
                name="skills"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.skills}
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
                name="description"
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
            href={paths.candidateDashboard.profile.index}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

CandidateProfileEditForm.propTypes = {};
