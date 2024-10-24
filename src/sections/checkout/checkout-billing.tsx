import type { ChangeEvent, FC } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Unstable_Grid2";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Billing } from "src/interfaces/checkout.interface";

interface PaymentMethod {
  label: string;
  value: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    label: "Pay Later",
    value: false,
  },
  {
    label: "Pay Now",
    value: true,
  },
];

interface CheckoutBillingProps {
  billing: Billing
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CheckoutBilling: FC<CheckoutBillingProps> = (props) => {
  const { billing, onChange, ...other } = props;

  return (
    <Stack {...other} spacing={0}>
      <Stack spacing={0}>
        {/* <Stack alignItems="center" direction="row" spacing={2}>
          <Box
            sx={{
              alignItems: "center",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 20,
              display: "flex",
              height: 40,
              justifyContent: "center",
              width: 40,
            }}
          >
            <Typography sx={{ fontWeight: "fontWeightBold" }} variant="h6">
              1
            </Typography>
          </Box>
          <Typography variant="h6">Billing Address</Typography>
        </Stack> */}
        {/* <div>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                onChange={onChange}
                value={billing.firstName}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                onChange={onChange}
                value={billing.lastName}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={onChange}
                value={billing.email}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                onChange={onChange}
                value={billing.phone}
              />
            </Grid>
            <Grid xs={12} sm={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="address"
                onChange={onChange}
                value={billing.address}
              />
            </Grid>
            <Grid xs={12} sm={12}>
              <TextField
                fullWidth
                label="Street Line 2 (optional)"
                name="optionalAddress"
                onChange={onChange}
                value={billing.optionalAddress}
              />
            </Grid>
            <Grid xs={12} sm={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={onChange}
                value={billing.country}
              />
            </Grid>
            <Grid xs={12} sm={12}>
              <TextField
                fullWidth
                label="State"
                name="state"
                onChange={onChange}
                value={billing.state}
              />
            </Grid>
            <Grid xs={12} sm={12}>
              <TextField
                fullWidth
                label="Zip"
                name="zip"
                onChange={onChange}
                value={billing.zip}
              />
            </Grid>
          </Grid>
        </div> */}
      </Stack>
      <Stack spacing={3}>
        {/* <Stack alignItems="center" direction="row" spacing={2}>
          <Box
            sx={{
              alignItems: "center",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 20,
              display: "flex",
              height: 40,
              justifyContent: "center",
              width: 40,
            }}
          >
            <Typography sx={{ fontWeight: "fontWeightBold" }} variant="h6">
              2
            </Typography>
          </Box>
          <Typography variant="h6">Payment</Typography>
        </Stack> */}
        <div>
          <div>
            <RadioGroup
              name="payNow"
              onChange={onChange}
              sx={{ flexDirection: "row" }}
              value={billing.payNow as boolean}
            >
              {paymentMethods.map((paymentMethod, index) => (
                <FormControlLabel
                  control={<Radio />}
                  key={index}
                  label={
                    <Typography variant="body1">
                      {paymentMethod.label}
                    </Typography>
                  }
                  value={paymentMethod.value}
                />
              ))}
            </RadioGroup>
          </div>
        </div>
      </Stack>
    </Stack>
  );
};

CheckoutBilling.propTypes = {
  // @ts-ignore
  billing: PropTypes.object,
  onChange: PropTypes.func,
};
