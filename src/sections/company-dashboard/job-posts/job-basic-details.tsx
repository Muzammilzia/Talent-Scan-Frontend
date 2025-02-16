import type { FC } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

interface JobBasicDetailsProps {
  jobRole?: string;
  minimumSalary?: string;
  maximumSalary?: string;
  payingCurrency: string;
  jobType?: string;
  isAcceptingApplications: boolean;
}

export const JobBasicDetails: FC<JobBasicDetailsProps> = (props) => {
  const { jobRole, minimumSalary, maximumSalary, payingCurrency, jobType, isAcceptingApplications, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader title="Job Details" />
      <PropertyList>
        <PropertyListItem
          divider
          label="Job Role / Title"
          value={jobRole}
        />
        <PropertyListItem
          divider
          label="Minimum Salary"
          value={minimumSalary}
        />
        <PropertyListItem
          divider
          label="Maximum Salary"
          value={maximumSalary}
        />
        <PropertyListItem
          divider
          label="Paying Currency"
          value={payingCurrency}
        />
        <PropertyListItem
          divider
          label="Job Type"
          value={jobType}
        />
        <PropertyListItem
          divider
          label="Accepting Applications?"
          value={isAcceptingApplications ? 'Yes' : 'No'}
        />
      </PropertyList>
    </Card>
  );
};
