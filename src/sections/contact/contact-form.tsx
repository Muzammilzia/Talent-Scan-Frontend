import type { FC, FormEvent } from 'react';
import { useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

export const ContactForm: FC = () => {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          xs={12}
          sm={6}
        >
          <FormControl fullWidth>
            <FormLabel
              sx={{
                color: 'text.primary',
                mb: 1
              }}
            >
              Full Name *
            </FormLabel>
            <OutlinedInput
              name="name"
              required
            />
          </FormControl>
        </Grid>
        <Grid
          xs={12}
          sm={6}
        >
          <FormControl fullWidth>
            <FormLabel
              sx={{
                color: 'text.primary',
                mb: 1
              }}
            >
              Company Name *
            </FormLabel>
            <OutlinedInput
              name="company"
              required
            />
          </FormControl>
        </Grid>
        <Grid
          xs={12}
          sm={6}
        >
          <FormControl fullWidth>
            <FormLabel
              sx={{
                color: 'text.primary',
                mb: 1
              }}
            >
              Work Email *
            </FormLabel>
            <OutlinedInput
              name="email"
              type="email"
              required
            />
          </FormControl>
        </Grid>
        <Grid
          xs={12}
          sm={6}
        >
          <FormControl fullWidth>
            <FormLabel
              sx={{
                color: 'text.primary',
                mb: 1
              }}
            >
              Phone Number *
            </FormLabel>
            <OutlinedInput
              name="phone"
              required
              type="tel"
            />
          </FormControl>
        </Grid>
        <Grid
          xs={12}
          sm={6}
        >
          <FormControl fullWidth>
            <FormLabel
              sx={{
                color: 'text.primary',
                mb: 1
              }}
            >
              Company Size
            </FormLabel>
            <Select
              fullWidth
              // value={value}
              // onChange={handleChange}
            >
              <MenuItem value="1-10">
                1-10
              </MenuItem>
              <MenuItem value="11-25">
                11-25
              </MenuItem>
              <MenuItem value="26-50">
                26-50
              </MenuItem>
              <MenuItem value="51-100">
                51-100
              </MenuItem>
              <MenuItem value="101-200">
                101-200
              </MenuItem>
              <MenuItem value="201-400">
                201-400
              </MenuItem>
              <MenuItem value="401-750">
                401-750
              </MenuItem>
              <MenuItem value="751-1000">
                751-1,000
              </MenuItem>
              <MenuItem value="1001-2000">
                1,001-2,000
              </MenuItem>
              <MenuItem value="2001-5000">
                2,001-5,000
              </MenuItem>
              <MenuItem value="5001-10000">
                5,001-10,000
              </MenuItem>
              <MenuItem value="10001-25000">
                10,001-25,000
              </MenuItem>
              <MenuItem value="25001-50000">
                25,001-50,000
              </MenuItem>
              <MenuItem value="50001+">
                50,001+
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          xs={12}
          sm={6}
        >
          <FormControl fullWidth>
            <FormLabel
              sx={{
                color: 'text.primary',
                mb: 1
              }}
            >
              Enquiry Type
            </FormLabel>
            <Select
              fullWidth
              // value={value}
              // onChange={handleChange}
            >
              <MenuItem value="sales">
                Sales Inquiry
              </MenuItem>
              <MenuItem value="technical">
                Technical Support
              </MenuItem>
              <MenuItem value="billing">
                Billing and Account
              </MenuItem>
              <MenuItem value="general">
                General Inquiry / Feedback
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <FormControl fullWidth>
            <FormLabel
              sx={{
                color: 'text.primary',
                mb: 1
              }}
            >
              Message
            </FormLabel>
            <OutlinedInput
              fullWidth
              name="message"
              required
              multiline
              rows={4}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3
        }}
      >
        <Button
          fullWidth
          size="large"
          variant="contained"
        >
          Let&apos;s Talk
        </Button>
      </Box>
      <Typography
        color="text.secondary"
        sx={{ mt: 3 }}
        variant="body2"
      >
        By submitting, you agree to the
        {' '}
        <Link
          color="text.primary"
          href="https://google.com"
          underline="always"
          variant="subtitle2"
        >
          Privacy Policy
        </Link>
        {' '}
        and
        {' '}
        <Link
          color="text.primary"
          href="https://google.com"
          underline="always"
          variant="subtitle2"
        >
          Cookie Policy
        </Link>
        .
      </Typography>
    </form>
  );
};
