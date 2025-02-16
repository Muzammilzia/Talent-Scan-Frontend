import type { ChangeEvent, MouseEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { useSelection } from "src/hooks/use-selection";
import { useJobPostListByCompany } from "src/hooks/jop-post/use-job-post";
import { useCompanyMe } from "src/hooks/auth/use-company-auth";
import { JobsListSearch } from "src/sections/company-dashboard/job-posts/job-post-list-search";
import { JobListTable } from "src/sections/company-dashboard/job-posts/job-post-list-table";
import { paths } from "src/paths";

interface Filters {
  query?: string;
  acceptingApplications?: boolean;
  notAcceptingApplications?: boolean;
}

interface SearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortDir: "asc" | "desc";
}

const useSearch = () => {
  const [state, setState] = useState<SearchState>({
    filters: {
      query: undefined,
      acceptingApplications: undefined,
      notAcceptingApplications: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: "updatedAt",
    sortDir: "desc",
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback(
    (sort: { sortBy: string; sortDir: "asc" | "desc" }): void => {
      setState((prevState) => ({
        ...prevState,
        sortBy: sort.sortBy,
        sortDir: sort.sortDir,
      }));
    },
    []
  );

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setState((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
      }));
    },
    []
  );

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

const useJobsIds = (jobs: any[] = []) => {
  return useMemo(() => {
    return jobs.map((jobs) => jobs._id);
  }, [jobs]);
};

const Page = () => {
  const search = useSearch();
  const { data: companyMeResponse } = useCompanyMe();
  const { data } = useJobPostListByCompany(companyMeResponse?.company?._id);
  const jobsIds = useJobsIds(data?.jobs || []);
  const jobsSelection = useSelection<string>(jobsIds);

  const [filteredJobs, setFilteredJobs] = useState<any[]>(data?.jobs || []);

  useEffect(() => {
    const updatedData = data?.jobs
      ?.filter((item: any) => {
        return (
          item?.role
            ?.toLowerCase()
            .includes(search.state.filters.query?.toLowerCase() || "") &&
          (search.state.filters.acceptingApplications
            ? item?.isAcceptingApplications
            : true) &&
          (search.state.filters.notAcceptingApplications
            ? !item?.isAcceptingApplications
            : true)
        );
      })
      .sort((a: any, b: any) => {
        const sortBy = search.state.sortBy || "createdAt";
        const sortDir = search.state.sortDir === "asc" ? 1 : -1;

        return (
          ((new Date(a[sortBy]) as any) - (new Date(b[sortBy]) as any)) * sortDir
        );
      });
    setFilteredJobs(updatedData);
  }, [data?.jobs, search.state]);

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Posted Jobs List" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Posted Jobs</Typography>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  href={paths.companyDashboard.jobPosts.create}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Create New
                </Button>
              </Stack>
            </Stack>
            <Card>
              <JobsListSearch
                onFiltersChange={search.handleFiltersChange}
                onSortChange={search.handleSortChange}
                sortBy={search.state.sortBy}
                sortDir={search.state.sortDir}
              />
              <JobListTable
                // count={data?.jobs.length}
                // items={data?.jobs}
                count={filteredJobs?.length || 0}
                items={filteredJobs || []}
                onDeselectAll={jobsSelection.handleDeselectAll}
                onDeselectOne={jobsSelection.handleDeselectOne}
                onPageChange={search.handlePageChange}
                onRowsPerPageChange={search.handleRowsPerPageChange}
                onSelectAll={jobsSelection.handleSelectAll}
                onSelectOne={jobsSelection.handleSelectOne}
                page={search.state.page}
                rowsPerPage={search.state.rowsPerPage}
                selected={jobsSelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
