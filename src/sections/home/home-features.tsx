import type { FC } from 'react';
import { useState } from 'react';
import LinkExternal01Icon from '@untitled-ui/icons-react/build/esm/LinkExternal01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface Feature {
  id: string;
  title: string;
  description: string;
  imageDark: string;
  imageLight: string;
}

const features: Feature[] = [
  {
    id: 'experts',
    title: 'Designed by Talent Experts',
    description: 'Our talent scan system is crafted by a team with deep recruitment expertise, ensuring best practices are followed at every step.',
    imageDark: '/assets/home-features-experts-dark.png',
    imageLight: '/assets/home-features-experts-light.png'
  },
  {
    id: 'tech',
    title: 'Powered by Advanced AI',
    description: 'Our system uses state-of-the-art NLP and AI algorithms to scan, analyze, and rank candidates effectively, helping you identify top talent.',
    imageDark: '/assets/home-features-tech-dark.png',
    imageLight: '/assets/home-features-tech-light.png'
  },
  {
    id: 'insights',
    title: 'Actionable Insights',
    description: 'Gain valuable insights into candidate strengths and match potential with data-driven analysis to help you make informed hiring decisions.',
    imageDark: '/assets/home-features-tech-dark.png',
    imageLight: '/assets/home-features-tech-light.png'
  },
  {
    id: 'customize',
    title: 'Tailored for Your Needs',
    description: 'Easily customize our talent scan solution to align with your unique hiring criteria and organizational requirements.',
    imageDark: '/assets/home-features-customize-dark.png',
    imageLight: '/assets/home-features-customize-light.png'
  }
];

export const HomeFeatures: FC = () => {
  const theme = useTheme();
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const feature = features[activeFeature];
  const image = theme.palette.mode === 'dark' ? feature?.imageDark : feature?.imageLight;

  return (
    <Box
      sx={{
        backgroundColor: 'neutral.800',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        color: 'common.white',
        py: '120px'
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={2}
          sx={{ mb: 8 }}
        >
          <Typography
            align="center"
            color="inherit"
            variant="h3"
          >
            Everything you need to run your project.
          </Typography>
          <Typography
            align="center"
            color="inherit"
            variant="subtitle2"
          >
            Not just a set of tools, the package includes ready-to-deploy conceptual application.
          </Typography>
        </Stack>
        <Grid
          alignItems="center"
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={6}
          >
            <Stack spacing={1}>
              {features.map((feature, index) => {
                const isActive = activeFeature === index;

                return (
                  <Box
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    sx={{
                      borderRadius: 2.5,
                      color: 'neutral.400',
                      cursor: 'pointer',
                      p: 3,
                      transition: (theme) => theme.transitions.create(
                        ['background-color, box-shadow', 'color'],
                        {
                          easing: theme.transitions.easing.easeOut,
                          duration: theme.transitions.duration.enteringScreen
                        }
                      ),
                      ...(isActive && {
                        backgroundColor: 'primary.alpha12',
                        boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
                        color: 'common.white'
                      }),
                      '&:hover': {
                        ...(!isActive && {
                          backgroundColor: 'primary.alpha4',
                          boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
                          color: 'common.white'
                        })
                      }
                    }}
                  >
                    <Typography
                      color="inherit"
                      sx={{ mb: 1 }}
                      variant="h6"
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      color="inherit"
                      variant="body2"
                    >
                      {feature.description}
                    </Typography>
                    {feature.id === 'figma' && (
                      <Box sx={{ mt: 3 }}>
                        <Button
                          color="success"
                          component="a"
                          endIcon={(
                            <SvgIcon fontSize="small">
                              <LinkExternal01Icon />
                            </SvgIcon>
                          )}
                          href="https://www.figma.com/file/xrx6uDljzsWuDZiuz3ITCp/Devias-Kit-Pro-UI-6.0-Master"
                          size="small"
                          target="_blank"
                          variant="contained"
                        >
                          Preview in Figma
                        </Button>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Grid>
          <Grid
            xs={12}
            md={6}
          >
            <Box
              sx={{
                '& img': {
                  width: '100%'
                }
              }}
            >
              <img src={image} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
