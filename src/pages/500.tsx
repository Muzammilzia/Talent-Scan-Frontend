import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';

const Page = () => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  usePageView();

  return (
    <>
      <Seo title="Error: Server Error" />
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          py: '80px'
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 6
            }}
          >
            <Box
              alt="Internal server error"
              component="img"
              src="/assets/errors/error-500.png"
              sx={{
                height: 'auto',
                maxWidth: '100%',
                width: 400
              }}
            />
          </Box>
          <Typography
            align="center"
            variant={mdUp ? 'h1' : 'h4'}
          >
            500: Internal Server Error
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            There is a problem with the server that is hosting your application. To resolve this issue, refresh the page, clear your browser cache, or try accessing the page at a later time. If the issue persists, please contact our support team.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6
            }}
          >
            <Button
              component={RouterLink}
              href={paths.index}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
