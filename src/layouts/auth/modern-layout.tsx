import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { Logo } from 'src/components/logo';
import { LogoSamsung } from 'src/components/logos/logo-samsung';
import { LogoVisma } from 'src/components/logos/logo-visma';
import { LogoBolt } from 'src/components/logos/logo-bolt';
import { LogoAws } from 'src/components/logos/logo-aws';
import { LogoAccenture } from 'src/components/logos/logo-accenture';
import { LogoAtt } from 'src/components/logos/logo-att';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: {
          xs: 'column-reverse',
          md: 'row'
        },
        "& span": {
          color: "primary.main",
        },
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "neutral.800",
          backgroundImage: 'url("/assets/gradient-bg.svg")',
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          color: "common.white",
          display: "flex",
          flexDirection: 'column',
          flex: {
            xs: "0 0 auto",
            md: "1 1 auto",
          },
          justifyContent: "space-evenly",
          p: {
            xs: 4,
            md: 8,
          },
        }}
      >
        <Box sx={{
              display: "flex",
            }}>
          <Box
            sx={{
              display: 'inline-flex',
              height: 24,
              width: 24,
            }}
          >
            {/* <Logo /> */}
          </Box>
          <Box
            sx={{
              color: "common.white",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.3px",
              lineHeight: 2.5,
              marginTop: '-6px',
              "& span": {
                color: "primary.main",
              },
            }}
          >
            Talent <span>Scan</span>
          </Box>
        </Box>
        <Box maxWidth="md">
          <Typography sx={{ mb: 1 }} variant="h4">
            Building a Resilient and Agile Business
          </Typography>
          <Typography sx={{ mb: 4 }}>
            Adapt quickly to changing market conditions and customer needs.
          </Typography>
        </Box>
        <Box></Box>
      </Box>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          flex: {
            xs: '1 1 auto',
            md: '0 0 auto'
          },
          flexDirection: 'column',
          justifyContent: {
            md: 'center'
          },
          maxWidth: '100%',
          p: {
            xs: 4,
            md: 8
          },
          width: {
            md: 600
          }
        }}
      >
        <div>
          {children}
        </div>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
