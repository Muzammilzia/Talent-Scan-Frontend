import { company } from "./api/jobs/data";

export const paths = {
  index: "/",
  checkout: "/checkout",
  contact: "/contact",
  pricing: "/pricing",
  auth: {
    candidate: {
      login: "/auth/candidate/login",
      register: "/auth/candidate/register",
    },
    company: {
      login: "/auth/company/login",
      register: "/auth/company/register",
    },
  },
  candidateDashboard: {
    index: "/candidate-dashboard",
    profile: {
      index: "/candidate-dashboard/profile",
      edit: "/candidate-dashboard/profile/edit",
    },
    jobs: {
      list: "/candidate-dashboard/jobs",
      recommended: "/candidate-dashboard/jobs/recommended",
      details: "/candidate-dashboard/jobs"
    },
    company: {
      list: "/candidate-dashboard/companies",
      details: "/candidate-dashboard/companies",
    },
  },
  companyDashboard: {
    index: "/company-dashboard",
    profile: {
      index: "/company-dashboard/profile",
      edit: "/company-dashboard/profile/edit",
    },
    jobPosts: {
      index: "/company-dashboard/job-posts",
      applications: "/company-dashboard/job-posts/applications",
      details: "/company-dashboard/job-posts",
      edit: "/company-dashboard/job-posts/edit",
      create: "/company-dashboard/job-posts/create",
    },
    candidate: {
      list: "/company-dashboard/candidates",
      details: "/company-dashboard/candidates",
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
