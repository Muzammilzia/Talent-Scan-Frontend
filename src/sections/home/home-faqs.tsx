import type { FC } from 'react';
import { useState } from 'react';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

interface FaqType {
  question: string;
  answer: string;
}

const faqs: FaqType[] = [
  {
    question: 'Can I try the talent scan platform before committing?',
    answer: 'Yes, we offer a 45-day free trial, with no credit card required, so you can experience the platform’s features firsthand.'
  },
  {
    question: 'How many teams or departments can use each Talent PRO account?',
    answer: 'For a Business PRO account, up to 5 teams within an organization can access the platform. With an Enterprise PRO account, up to 15 teams can utilize the service. Each team must belong to the same organization.'
  },
  {
    question: 'Is there a monthly subscription option?',
    answer: 'No, we only offer annual subscriptions to ensure a long-term strategic partnership. However, you can start with our 45-day free trial, no credit card needed.'
  },
  {
    question: 'Which regions does the talent scan platform support?',
    answer: 'We support 190 countries worldwide. However, services are not available in Cuba, Iran, North Korea, Sudan, or Syria.'
  }
];

interface FaqProps {
  answer: string;
  question: string;
}

const Faq: FC<FaqProps> = (props) => {
  const { answer, question } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Stack
      onClick={() => setIsExpanded((prevState) => !prevState)}
      spacing={2}
      sx={{ cursor: 'pointer' }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography variant="subtitle1">
          {question}
        </Typography>
        <SvgIcon>
          {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </SvgIcon>
      </Stack>
      <Collapse in={isExpanded}>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {answer}
        </Typography>
      </Collapse>
    </Stack>
  );
};

export const HomeFaqs: FC = () => {
  return (
    <Box sx={{ py: '120px' }}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
        >
          <Grid
            xs={12}
            md={6}
          >
            <Stack spacing={2}>
              <Typography variant="h3">
                Everything you need to know
              </Typography>
              <Typography
                color="text.secondary"
                variant="subtitle2"
              >
                Frequently asked questions
              </Typography>
            </Stack>
          </Grid>
          <Grid
            xs={12}
            md={6}
          >
            <Stack spacing={4}>
              {faqs.map((faq, index) => (
                <Faq
                  key={index}
                  {...faq}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
