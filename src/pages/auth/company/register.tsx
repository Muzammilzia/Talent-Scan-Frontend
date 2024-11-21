import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AuthContextType } from "src/contexts/auth/jwt-context";
import { useAuth } from "src/hooks/use-auth";

import { RouterLink } from 'src/components/router-link';
import { useRouter } from 'src/hooks/use-router';
import { useMounted } from 'src/hooks/use-mounted';
import { Seo } from 'src/components/seo';
import { paths } from 'src/paths';

interface Values {
  email: string;
  name: string;
  password: string;
  policy: boolean;
}

const initialValues: Values = {
  email: '',
  name: '',
  password: '',
  policy: false
};

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  name: Yup
    .string()
    .max(255)
    .required('Name is required'),
  password: Yup
    .string()
    .min(7)
    .max(255)
    .required('Password is required'),
  policy: Yup
    .boolean()
    .oneOf([true], 'This field must be checked')
});

const Page = () => {
  const router = useRouter();
  const isMounted = useMounted();
  const {signUp} = useAuth<AuthContextType>();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await signUp(values.email, values.name, values.password); 
        if (isMounted()) {
          router.push('/auth/company/login'); // Redirect to login page
        }
      } catch (err) {
        console.error(err);
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ email: 'An error occurred during registration' });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  return (
    <>
      <Seo title="Register" />
      <div>
        <Box sx={{ mb: 4 }}>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.index}
            sx={{
              alignItems: 'center',
              display: 'inline-flex'
            }}
            underline="hover"
          >
            <SvgIcon sx={{ mr: 1 }}>
              <ArrowLeftIcon />
            </SvgIcon>
            <Typography variant="subtitle2">
              Dashboard
            </Typography>
          </Link>
        </Box>
        <Stack
          sx={{ mb: 4 }}
          spacing={1}
        >
          <Typography variant="h5">
            Register
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Already have an account?
            &nbsp;
            <Link
              href="/auth/company/login"
              underline="hover"
              variant="subtitle2"
            >
              Log in
            </Link>
          </Typography>
        </Stack>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Stack spacing={3}>
            <TextField
              error={!!(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <TextField
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
            />
            <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
            />
          </Stack>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              ml: -1,
              mt: 1
            }}
          >
            <Checkbox
              checked={formik.values.policy}
              name="policy"
              onChange={formik.handleChange}
            />
            <Typography
              color="text.secondary"
              variant="body2"
            >
              I have read the
              {' '}
              <Link
                component="a"
                href="#"
              >
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          {!!(formik.touched.policy && formik.errors.policy) && (
            <FormHelperText error>
              {formik.errors.policy}
            </FormHelperText>
          )}
          <Button
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </form>
      </div>
    </>
  );
};

export default Page;