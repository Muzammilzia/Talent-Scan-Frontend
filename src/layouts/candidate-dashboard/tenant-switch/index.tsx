import type { FC } from 'react';
import PropTypes from 'prop-types';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import type { SxProps } from '@mui/system/styleFunctionSx';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { usePopover } from 'src/hooks/use-popover';

import { TenantPopover } from './tenant-popover';
import { useCandidateMe } from 'src/hooks/auth/use-candidate-auth';

const tenants: string[] = ['Devias', 'Acme Corp'];

interface TenantSwitchProps {
  sx?: SxProps;
}

export const TenantSwitch: FC<TenantSwitchProps> = (props) => {
  const { data } = useCandidateMe()

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        {...props}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="inherit"
            variant="h6"
          >
            Talent Scan
          </Typography>
          <Typography
            color="neutral.400"
            variant="body2"
          >
            {data?.candidate?.fullName}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

TenantSwitch.propTypes = {
  // @ts-ignore
  sx: PropTypes.object
};
