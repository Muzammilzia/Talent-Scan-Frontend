import type { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const HomeCta: FC = () => (
  <Box
    sx={{
      backgroundColor: 'neutral.800',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      backgroundImage: 'url("/assets/gradient-bg.svg")',
      color: 'neutral.100',
      py: '120px'
    }}
  >
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Typography
          align="center"
          color="inherit"
          variant="h3"
        >
          Become a PRO today!
        </Typography>
        <Typography
          align="center"
          color="inherit"
          variant="subtitle2"
        >
          Talent Scan goes beyond conventional solutions; it offers a powerful framework that enables organizations to optimize their talent acquisition and development processes
        </Typography>
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Button
          component="a"
          href="https://app.operatingpro.com/auth/register-company"
          variant="contained"
        >
          Instant Access
        </Button>
      </Stack>
    </Container>
  </Box>
);
