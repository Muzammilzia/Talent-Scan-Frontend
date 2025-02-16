import type { FC } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";

import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";
import { Typography } from "@mui/material";

interface JobDescriptionProps {
  description?: string;
}

export const JobDescription: FC<JobDescriptionProps> = (props) => {
  const { description, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader title="Job Details" />
      <Typography sx={{ padding: "0px 24px 16px 24px" }} color="text.secondary" variant="body2">
        {description}
      </Typography>
    </Card>
  );
};
