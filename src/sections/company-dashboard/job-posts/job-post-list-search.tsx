import type { FC } from "react";
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";

import { useUpdateEffect } from "src/hooks/use-update-effect";

interface Filters {
  query?: string;
  acceptingApplications?: boolean;
  notAcceptingApplications?: boolean;
}

type TabValue = "all" | "acceptingApplications" | "notAcceptingApplications";

interface TabOption {
  label: string;
  value: TabValue;
}

const tabs: TabOption[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Accepting Applications",
    value: "acceptingApplications",
  },
  {
    label: "Not Accepting Applications",
    value: "notAcceptingApplications",
  },
];

type SortValue =
  | "updatedAt|desc"
  | "updatedAt|asc"
  | "createdAt|desc"
  | "createdAt|asc";

interface SortOption {
  label: string;
  value: SortValue;
}

const sortOptions: SortOption[] = [
  {
    label: "Created (newest)",
    value: "createdAt|desc",
  },
  {
    label: "Created (oldest)",
    value: "createdAt|asc",
  },
  {
    label: "Last update (newest)",
    value: "updatedAt|desc",
  },
  {
    label: "Last update (oldest)",
    value: "updatedAt|asc",
  },
];

type SortDir = "asc" | "desc";

interface JobsListSearchProps {
  onFiltersChange?: (filters: Filters) => void;
  onSortChange?: (sort: { sortBy: string; sortDir: SortDir }) => void;
  sortBy?: string;
  sortDir?: SortDir;
}

export const JobsListSearch: FC<JobsListSearchProps> = (props) => {
  const { onFiltersChange, onSortChange, sortBy, sortDir } = props;
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [currentTab, setCurrentTab] = useState<TabValue>("all");
  const [filters, setFilters] = useState<Filters>({});

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback(
    (event: ChangeEvent<{}>, value: TabValue): void => {
      setCurrentTab(value);
      setFilters((prevState: any) => {
        const updatedFilters: Filters = {
          ...prevState,
          acceptingApplications: undefined,
          notAcceptingApplications: undefined,
        };

        if (value !== "all") {
          updatedFilters[value] = true;
        }

        return updatedFilters;
      });
    },
    []
  );

  const handleQueryChange = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      setFilters((prevState: any) => ({
        ...prevState,
        query: queryRef.current?.value,
      }));
    },
    []
  );

  const handleSortChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const [sortBy, sortDir] = event.target.value.split("|") as [
        string,
        SortDir
      ];

      onSortChange?.({
        sortBy,
        sortDir,
      });
    },
    [onSortChange]
  );

  return (
    <>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ px: 3 }}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={3}
        sx={{ p: 3 }}
      >
        <Box component="form" onSubmit={handleQueryChange} sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder="Search jobs"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={`${sortBy}|${sortDir}`}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>
    </>
  );
};

JobsListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf<SortDir>(["asc", "desc"]),
};
