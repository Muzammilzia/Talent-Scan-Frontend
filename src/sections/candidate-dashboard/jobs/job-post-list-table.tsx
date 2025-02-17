import type { ChangeEvent, FC, MouseEvent } from "react";
import numeral from "numeral";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { RouterLink } from "src/components/router-link";
import { Scrollbar } from "src/components/scrollbar";
import { paths } from "src/paths";
import { Chip } from "@mui/material";

interface JobListTableProps {
  count?: number;
  items?: any[];
  onPageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
  appliedJobs?: any[];
}

export const JobListTable: FC<JobListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    appliedJobs,
  } = props;

  return (
    <Box sx={{ position: "relative" }}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Salary Range</TableCell>
              <TableCell>Job Type</TableCell>
              <TableCell>Paying Currency</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              const applied = appliedJobs?.includes(item._id);

              return (
                <TableRow hover key={item._id}>
                  <TableCell>{item?.role}</TableCell>
                  <TableCell>{item?.company?.name}</TableCell>
                  <TableCell>{`${item?.minimumSalary} - ${item?.maximumSalary}`}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {item?.jobType}
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {item?.payingCurrency}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {applied && (
                      <Chip
                        label="Applied"
                        variant="outlined"
                        color="success"
                        sx={{
                          borderColor: "green",
                          backgroundColor: "rgba(76, 175, 80, 0.1)", // Light green background
                          color: "green",
                          fontWeight: "bold",
                          mr: 1, // Right margin
                        }}
                      />
                    )}
                    <IconButton
                      component={RouterLink}
                      href={`${paths.candidateDashboard.jobs.details}/${item._id}`}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

JobListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
