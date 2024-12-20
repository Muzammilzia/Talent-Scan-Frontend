import { company } from "./api/jobs/data";

export const paths = {
  index: "/",
  checkout: "/checkout",
  contact: "/contact",
  pricing: "/pricing",
  auth: {
    jwt: {
      login: "/auth/jwt/login",
      register: "/auth/jwt/register",
    },
    candidate: {
      login: "/auth/candidate/login",
      register: "/auth/candidate/register",
    },
    company: {
      login: "/auth/company/login",
      register: "/auth/company/register",
    },
  },
  authDemo: {
    forgotPassword: {
      classic: "/auth-demo/forgot-password/classic",
      modern: "/auth-demo/forgot-password/modern",
    },
    login: {
      classic: "/auth-demo/login/classic",
      modern: "/auth-demo/login/modern",
    },
    register: {
      classic: "/auth-demo/register/classic",
      modern: "/auth-demo/register/modern",
    },
    resetPassword: {
      classic: "/auth-demo/reset-password/classic",
      modern: "/auth-demo/reset-password/modern",
    },
    verifyCode: {
      classic: "/auth-demo/verify-code/classic",
      modern: "/auth-demo/verify-code/modern",
    },
  },
  dashboard: {
    index: "/dashboard",
    academy: {
      index: "/dashboard/academy",
      courseDetails: "/dashboard/academy/courses/:courseId",
    },
    account: "/dashboard/account",
    analytics: "/dashboard/analytics",
    blank: "/dashboard/blank",
    blog: {
      index: "/dashboard/blog",
      postDetails: "/dashboard/blog/:postId",
      postCreate: "/dashboard/blog/create",
    },
    calendar: "/dashboard/calendar",
    chat: "/dashboard/chat",
    crypto: "/dashboard/crypto",
    customers: {
      index: "/dashboard/customers",
      details: "/dashboard/customers/:customerId",
      edit: "/dashboard/customers/:customerId/edit",
    },
    ecommerce: "/dashboard/ecommerce",
    fileManager: "/dashboard/file-manager",
    invoices: {
      index: "/dashboard/invoices",
      details: "/dashboard/invoices/:orderId",
    },
    jobs: {
      index: "/dashboard/jobs",
      create: "/dashboard/jobs/create",
      companies: {
        details: "/dashboard/jobs/companies/:companyId",
      },
    },
    kanban: "/dashboard/kanban",
    logistics: {
      index: "/dashboard/logistics",
      fleet: "/dashboard/logistics/fleet",
    },
    mail: "/dashboard/mail",
    orders: {
      index: "/dashboard/orders",
      details: "/dashboard/orders/:orderId",
    },
    products: {
      index: "/dashboard/products",
      create: "/dashboard/products/create",
    },
    social: {
      index: "/dashboard/social",
      profile: "/dashboard/social/profile",
      feed: "/dashboard/social/feed",
    },
  },
  candidateDashboard: {
    index: "/candidate-dashboard",
    academy: {
      index: "/candidate-dashboard/academy",
      courseDetails: "/candidate-dashboard/academy/courses/:courseId",
    },
    account: "/candidate-dashboard/account",
    analytics: "/candidate-dashboard/analytics",
    blank: "/candidate-dashboard/blank",
    blog: {
      index: "/candidate-dashboard/blog",
      postDetails: "/candidate-dashboard/blog/:postId",
      postCreate: "/candidate-dashboard/blog/create",
    },
    calendar: "/candidate-dashboard/calendar",
    chat: "/candidate-dashboard/chat",
    crypto: "/candidate-dashboard/crypto",
    customers: {
      index: "/candidate-dashboard/customers",
      details: "/candidate-dashboard/customers/:customerId",
      edit: "/candidate-dashboard/customers/:customerId/edit",
    },
    ecommerce: "/candidate-dashboard/ecommerce",
    fileManager: "/candidate-dashboard/file-manager",
    invoices: {
      index: "/candidate-dashboard/invoices",
      details: "/candidate-dashboard/invoices/:orderId",
    },
    jobs: {
      index: "/candidate-dashboard/jobs",
      create: "/candidate-dashboard/jobs/create",
      companies: {
        details: "/candidate-dashboard/jobs/companies/:companyId",
      },
    },
    kanban: "/candidate-dashboard/kanban",
    logistics: {
      index: "/candidate-dashboard/logistics",
      fleet: "/candidate-dashboard/logistics/fleet",
    },
    mail: "/candidate-dashboard/mail",
    orders: {
      index: "/candidate-dashboard/orders",
      details: "/candidate-dashboard/orders/:orderId",
    },
    products: {
      index: "/candidate-dashboard/products",
      create: "/candidate-dashboard/products/create",
    },
    social: {
      index: "/candidate-dashboard/social",
      profile: "/candidate-dashboard/social/profile",
      feed: "/candidate-dashboard/social/feed",
    },
  },
  companyDashboard: {
    index: "/company-dashboard",
    academy: {
      index: "/company-dashboard/academy",
      courseDetails: "/company-dashboard/academy/courses/:courseId",
    },
    account: "/company-dashboard/account",
    analytics: "/company-dashboard/analytics",
    blank: "/company-dashboard/blank",
    blog: {
      index: "/company-dashboard/blog",
      postDetails: "/company-dashboard/blog/:postId",
      postCreate: "/company-dashboard/blog/create",
    },
    calendar: "/company-dashboard/calendar",
    chat: "/company-dashboard/chat",
    crypto: "/company-dashboard/crypto",
    customers: {
      index: "/company-dashboard/customers",
      details: "/company-dashboard/customers/:customerId",
      edit: "/company-dashboard/customers/:customerId/edit",
    },
    ecommerce: "/company-dashboard/ecommerce",
    fileManager: "/company-dashboard/file-manager",
    invoices: {
      index: "/company-dashboard/invoices",
      details: "/company-dashboard/invoices/:orderId",
    },
    jobs: {
      index: "/company-dashboard/jobs",
      create: "/company-dashboard/jobs/create",
      companies: {
        details: "/company-dashboard/jobs/companies/:companyId",
      },
    },
    kanban: "/company-dashboard/kanban",
    logistics: {
      index: "/company-dashboard/logistics",
      fleet: "/company-dashboard/logistics/fleet",
    },
    mail: "/company-dashboard/mail",
    orders: {
      index: "/company-dashboard/orders",
      details: "/company-dashboard/orders/:orderId",
    },
    products: {
      index: "/company-dashboard/products",
      create: "/company-dashboard/products/create",
    },
    social: {
      index: "/company-dashboard/social",
      profile: "/company-dashboard/social/profile",
      feed: "/company-dashboard/social/feed",
    },
  },
  components: {
    index: "/components",
    dataDisplay: {
      detailLists: "/components/data-display/detail-lists",
      tables: "/components/data-display/tables",
      quickStats: "/components/data-display/quick-stats",
    },
    lists: {
      groupedLists: "/components/lists/grouped-lists",
      gridLists: "/components/lists/grid-lists",
    },
    forms: "/components/forms",
    modals: "/components/modals",
    charts: "/components/charts",
    buttons: "/components/buttons",
    typography: "/components/typography",
    colors: "/components/colors",
    inputs: "/components/inputs",
  },
  docs: "https://material-kit-pro-react-docs.devias.io",
  notAuthorized: "/401",
  notFound: "/404",
  serverError: "/500",
};
