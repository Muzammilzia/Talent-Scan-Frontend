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
import { useJobPostListAllCandidate } from "src/hooks/jop-post/use-job-post";
import { JobsListSearch } from "src/sections/candidate-dashboard/jobs/job-post-list-search";
import { JobListTable } from "src/sections/candidate-dashboard/jobs/job-post-list-table";
import { useCandidateList, useCandidateMe } from "src/hooks/auth/use-candidate-auth";
import { useJobApplicationsByCandidate } from "src/hooks/job-application/use-job-application";
import { CandidatesListTable } from "src/sections/company-dashboard/candidates/candidates-list-table";
import { CandidatesListSearch } from "src/sections/company-dashboard/candidates/candidates-list-search";
import { CompaniesListSearch } from "src/sections/candidate-dashboard/companies/companies-list-search";
import { CompaniesListTable } from "src/sections/candidate-dashboard/companies/companies-list-table";
import { useCompanyList } from "src/hooks/auth/use-company-auth";

interface Filters {
  query?: string;
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

const Page = () => {
  const search = useSearch();

  const { data: companyListResponse } = useCompanyList();

  const [filteredCompanies, setFilteredCompanies] = useState<any[]>(companyListResponse?.companies || []);

  useEffect(() => {
    const updatedData = companyListResponse?.companies
      ?.filter((item: any) => {
        return (
          item?.name
            ?.toLowerCase()
            .includes(search.state.filters.query?.toLowerCase() || "")
        );
      })
      .sort((a: any, b: any) => {
        const sortBy = search.state.sortBy || "createdAt";
        const sortDir = search.state.sortDir === "asc" ? 1 : -1;

        return (
          ((new Date(a[sortBy]) as any) - (new Date(b[sortBy]) as any)) * sortDir
        );
      });
      setFilteredCompanies(updatedData);
  }, [companyListResponse?.companies, search.state]);

  console.log(filteredCompanies)

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Companies List" />
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
                <Typography variant="h4">Companies List</Typography>
              </Stack>
            </Stack>
            <Card>
              <CompaniesListSearch
                onFiltersChange={search.handleFiltersChange}
                onSortChange={search.handleSortChange}
                sortBy={search.state.sortBy}
                sortDir={search.state.sortDir}
              />
              <CompaniesListTable
                count={filteredCompanies?.length || 0}
                items={filteredCompanies || []}
                onPageChange={search.handlePageChange}
                onRowsPerPageChange={search.handleRowsPerPageChange}
                page={search.state.page}
                rowsPerPage={search.state.rowsPerPage}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
