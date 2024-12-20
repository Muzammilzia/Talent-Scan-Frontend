import type { RouteObject } from "react-router";
import { Outlet } from "react-router-dom";

import { Layout as MarketingLayout } from "src/layouts/marketing";
import HomePage from "src/pages";
import Error401Page from "src/pages/401";
import Error404Page from "src/pages/404";
import Error500Page from "src/pages/500";
import ContactPage from "src/pages/contact";
import CheckoutPage from "src/pages/checkout";
import PricingPage from "src/pages/pricing";

import { authRoutes } from "./auth";
import { authDemoRoutes } from "./auth-demo";
import { componentsRoutes } from "./components";
import { dashboardRoutes } from "./dashboard";
import { candidateDashboardRoutes } from "./candidate-dashboard";
import { companyDashboardRoutes } from "./company-dashboard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Layout as AuthLayout} from "src/layouts/auth/modern-layout";

const stripePromise = loadStripe(
  "pk_test_51O9CXAL9HBA3lYZUJjzrBw5oQ93bnnjJdZSnGpHsUzf5yHVurvZAT7XwlMebzAbDD7YWS1Hm9FNH4Q8fmS6JY3QT00GnkSbpGD"
);
let promiseFullFil = null;
type StripeElementsOptionsMode = "payment" | "setup" | "subscription" | undefined;

stripePromise.then((resolve) => (promiseFullFil = resolve));
const clientSecret = process.env.STRIPE_SECRET_KEY
const  options: { mode: StripeElementsOptionsMode; currency: string; amount: number; } = {
  mode: 'payment',
  currency: 'usd',
  amount: 1099,
};
export const routes: RouteObject[] = [
  {
    element: (
      <MarketingLayout>
        <Outlet />
      </MarketingLayout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "pricing",
        element: <PricingPage />,
      },
      ...componentsRoutes,
    ],
  },
  ...authRoutes,
  ...authDemoRoutes,
  ...dashboardRoutes,
  ...candidateDashboardRoutes,
  ...companyDashboardRoutes,
  {
    path: "checkout",
    element: (
      <Elements stripe={stripePromise}  options={options}>
        {" "}
        <AuthLayout>
        <CheckoutPage />
        </AuthLayout>
        {/* {promiseFullFil ? <CheckoutPage /> : <div></div>}{" "} */}
      </Elements>
     
    ),
  },
  {
    path: "contact",
    element: <ContactPage />,
  },
  {
    path: "401",
    element: <Error401Page />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "500",
    element: <Error500Page />,
  },
  {
    path: "*",
    element: <Error404Page />,
  },
];
