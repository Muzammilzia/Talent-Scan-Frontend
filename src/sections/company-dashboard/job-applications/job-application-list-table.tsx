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

interface JobApplicationListTableProps {
  count?: number;
  items?: any[];
  onDeselectAll?: () => void;
  onDeselectOne?: (customerId: string) => void;
  onPageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectAll?: () => void;
  onSelectOne?: (customerId: string) => void;
  page?: number;
  rowsPerPage?: number;
  selected?: string[];
}

export const JobApplicationListTable: FC<JobApplicationListTableProps> = (
  props
) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const enableBulkActions = selected.length > 0;

  return (
    <Box sx={{ position: "relative" }}>
      {enableBulkActions && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
            display: enableBulkActions ? "flex" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            px: 2,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={(event) => {
              if (event.target.checked) {
                onSelectAll?.();
              } else {
                onDeselectAll?.();
              }
            }}
          />
          <Button color="inherit" size="small">
            Delete
          </Button>
          <Button color="inherit" size="small">
            Edit
          </Button>
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Candidate</TableCell>
              <TableCell>Candidate's Email</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>AI Score</TableCell>
              <TableCell align="center">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              const isSelected = selected.includes(item._id);
              //   const location = `${customer.city}, ${customer.state}, ${customer.country}`;
              //   const totalSpent = numeral(customer.totalSpent).format(`${customer.currency}0,0.00`);

              return (
                <TableRow hover key={item._id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(
                        event: ChangeEvent<HTMLInputElement>
                      ): void => {
                        if (event.target.checked) {
                          onSelectOne?.(item._id);
                        } else {
                          onDeselectOne?.(item._id);
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell>
                  <TableCell>{item?.candidate?.fullName}</TableCell>
                  <TableCell>{item?.candidate?.email}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {item?.job?.role}
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{item?.AIScore}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction={'row'} justifyContent={'center'} spacing={2}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        href={`${paths.companyDashboard.candidate.details}/${item?.candidate?._id}`}
                      >
                        Candidate
                      </Button>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        href={`${paths.companyDashboard.jobPosts.details}/${item?.job?._id}`}
                      >
                        Job
                      </Button>
                    </Stack>
                  </TableCell>
                  {/* <TableCell align="right">
                    <IconButton
                      component={RouterLink}
                      href={`${paths.companyDashboard.jobPosts.edit}/${item._id}`}
                    >
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                    <IconButton
                      component={RouterLink}
                      href={`${paths.companyDashboard.jobPosts.details}/${item._id}`}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell> */}
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

JobApplicationListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
