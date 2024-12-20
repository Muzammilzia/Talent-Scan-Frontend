import type { ChangeEvent, FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Calendar from "@untitled-ui/icons-react/build/esm/Calendar";
import Lock01 from "@untitled-ui/icons-react/build/esm/Lock01";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import CreditCardIcon from '@mui/icons-material/CreditCard';

import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import { CheckoutBilling } from "src/sections/checkout/checkout-billing";
import { CardCvcElement, CardNumberElement,CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router";
import { toast } from "react-hot-toast";
import { Billing } from "src/interfaces/checkout.interface";
import {loadStripe} from '@stripe/stripe-js';
import { paths } from "src/paths";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const options = {
  mode: 'payment',
  currency: 'usd',
  amount: 1099,
};

const initialBilling: Billing = {
  address: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  optionalAddress: "",
  state: "",
  zip: "",
  country: "",
  paid: false,
  payNow: false,
  planType: "",
};

const Page = () => {
  const [billing, setBilling] = useState(initialBilling);

  const stripe = useStripe();
  const elements = useElements();

  usePageView();
  const params = useLocation();

  useEffect(
    () =>
      setBilling((prevState) => ({
        ...prevState,
        planType: params.search.split("=")[1],
      })),
    [params.search]
  );

  console.log(billing.planType)

  const handleBillingChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let payNow: boolean = false;
    if (event.target.name === "payNow") {
      event.target.value === "false" ? (payNow = false) : (payNow = true);
    }
    setBilling((prevState) => ({
      ...prevState,
      [event.target.name]:
        event.target.name === "payNow" ? payNow : event.target.value,
    }));
  };

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      let formValues: any = {};

      for (let [name, value] of formData.entries()) {
        formValues[name] = value;
      }

      formValues = {
        ...formValues,
        payNow: formValues.payNow === "false" ? false : true,
        planType: params.search.split("=")[1],
      };

      if (!stripe || !elements) {
        return;
      }

      if (formValues.payNow) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardNumberElement)!,
        });

        if (error) {
          toast.error(error?.message || "Error in Stripe");
        } else {
          postStripeSubscription({ ...formValues, paymentDetails: paymentMethod, amount: billing.planType === "business" ? 990 : 1990 });
        }
      } else {
        postStripeSubscription(formValues);
      }
    },
    [stripe, elements]
  );

  const postStripeSubscription = async (data: Billing) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/payment/create-subscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("temp_token")}`
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      toast.success("Subscription created successfully!");
      window.localStorage.removeItem("temp_token");
      setTimeout(
        () =>
          (window.location.href = paths.auth.candidate.login),
        1000
      );
    } else {
      toast.error("Subscription creation failed.");
    }
  };

  return (
    <>
      <Seo title="Checkout " />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {/* <Layout> */}
        <Container maxWidth="xs">
          <form onSubmit={handleSubmit}>
            <Stack spacing={0}>
              <Typography variant="h3">Checkout</Typography>
            </Stack>
            <Box mt={6}>
              <Grid container spacing={6}>
                <Grid md={12} sm={12} xs={12}>
                  <CheckoutBilling
                    billing={billing}
                    onChange={handleBillingChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 6 }}>
              
              
              {billing.payNow ? (
                <>
                <Typography  sx={{mt:2,mb:0}}>Card Number </Typography>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding:'10px',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                }}>
                  <Box sx={{flexGrow: 1}}>                  
                    <CardNumberElement 
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}/>
                  </Box>
                  <CreditCardIcon sx={{color: "#6366F1"}}/>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                  <Box sx={{width: "48%"}}>
                    <Typography  sx={{mt:2,mb:0}}>Expiration</Typography>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding:'10px',
                      border: '1px solid rgba(0, 0, 0, 0.2)',
                      borderRadius: '8px',
                    }}>
                      <Box sx={{flexGrow: 1}}>
                        <CardExpiryElement 
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#424770",
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                            },
                            invalid: {
                              color: "#9e2146",
                            },
                          },
                        }}/>
                      </Box>
                      <Calendar color="#6366F1"/>
                    </Box>
                  </Box>
                  <Box sx={{width: "48%"}}>
                    <Typography  sx={{mt:2,mb:0}}>CVC</Typography>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding:'10px',
                      border: '1px solid rgba(0, 0, 0, 0.2)',
                      borderRadius: '8px',
                    }}>
                      <Box sx={{flexGrow: 1}}>
                        <CardCvcElement 
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#424770",
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                            },
                            invalid: {
                              color: "#9e2146",
                            },
                          },
                        }}/>
                      </Box>
                      <Lock01 color="#6366F1"/>
                    </Box>
                  </Box>
                </Box>
                </>
              ):(
                <>
                <Typography  sx={{mt:2,mb:2}}>You can start a free trial. No credit card is required. </Typography>
                </>
              )}
              <Button
                color="primary"
                endIcon={
                  <SvgIcon>
                    <ArrowRightIcon />
                  </SvgIcon>
                }
                size="medium"
                type="submit"
                variant="contained"
                sx={{
                  marginTop: 2,
                  width:'100%'
                }}
              >
                {billing.payNow
                  ? `Pay ${billing.planType === "business" ? "$990" : "$1,990"}`
                  : "Start Free Trial "}
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Page;
