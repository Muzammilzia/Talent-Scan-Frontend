import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from 'src/layouts/company-dashboard';

const IndexPage = lazy(() => import('src/pages/company-dashboard/index'));

// Academy
const AcademyDashboardPage = lazy(() => import('src/pages/company-dashboard/academy/dashboard'));
const AcademyCoursePage = lazy(() => import('src/pages/company-dashboard/academy/course'));

// Blog
const BlogPostListPage = lazy(() => import('src/pages/company-dashboard/blog/list'));
const BlogPostDetailPage = lazy(() => import('src/pages/company-dashboard/blog/detail'));
const BlogPostCreatePage = lazy(() => import('src/pages/company-dashboard/blog/create'));

// Customer
const CustomerListPage = lazy(() => import('src/pages/company-dashboard/customers/list'));
const CustomerDetailPage = lazy(() => import('src/pages/company-dashboard/customers/detail'));
const CustomerEditPage = lazy(() => import('src/pages/company-dashboard/customers/edit'));

// JobPosts
const JobPostsCreatePage = lazy(() => import('src/pages/company-dashboard/job-posts/create'));
const JobPostsListPage = lazy(() => import('src/pages/company-dashboard/job-posts/list'));
const JobPostsDetailsPage = lazy(() => import('src/pages/company-dashboard/job-posts/detail'));
const JobPostsEditPage = lazy(() => import('src/pages/company-dashboard/job-posts/edit'));

// candidates
const CandidatesListPage = lazy(() => import('src/pages/company-dashboard/candidates/list'))
const CandidatesDetailsPage = lazy(() => import('src/pages/company-dashboard/candidates/detail'))

// Company Profile
const CompanyProfilePage = lazy(() => import('src/pages/company-dashboard/profile'));
const CompanyProfileEditPage = lazy(() => import('src/pages/company-dashboard/profile/edit'));

// Invoice
const InvoiceListPage = lazy(() => import('src/pages/company-dashboard/invoices/list'));
const InvoiceDetailPage = lazy(() => import('src/pages/company-dashboard/invoices/detail'));

// Job
const JobBrowsePage = lazy(() => import('src/pages/company-dashboard/jobs/browse'));
const JobCreatePage = lazy(() => import('src/pages/company-dashboard/jobs/create'));
const CompanyDetailPage = lazy(() => import('src/pages/company-dashboard/jobs/companies/detail'));

// Logistics
const LogisticsDashboardPage = lazy(() => import('src/pages/company-dashboard/logistics/dashboard'));
const LogisticsFleetPage = lazy(() => import('src/pages/company-dashboard/logistics/fleet'));

// Order
const OrderListPage = lazy(() => import('src/pages/company-dashboard/orders/list'));
const OrderDetailPage = lazy(() => import('src/pages/company-dashboard/orders/detail'));

// Product
const ProductListPage = lazy(() => import('src/pages/company-dashboard/products/list'));
const ProductCreatePage = lazy(() => import('src/pages/company-dashboard/products/create'));

// Social
const SocialFeedPage = lazy(() => import('src/pages/company-dashboard/social/feed'));
const SocialProfilePage = lazy(() => import('src/pages/company-dashboard/social/profile'));

// Other
const AccountPage = lazy(() => import('src/pages/company-dashboard/account'));
const AnalyticsPage = lazy(() => import('src/pages/company-dashboard/analytics'));
const BlankPage = lazy(() => import('src/pages/company-dashboard/blank'));
const CalendarPage = lazy(() => import('src/pages/company-dashboard/calendar'));
const ChatPage = lazy(() => import('src/pages/company-dashboard/chat'));
const CryptoPage = lazy(() => import('src/pages/company-dashboard/crypto'));
const EcommercePage = lazy(() => import('src/pages/company-dashboard/ecommerce'));
const FileManagerPage = lazy(() => import('src/pages/company-dashboard/file-manager'));
const KanbanPage = lazy(() => import('src/pages/company-dashboard/kanban'));
const MailPage = lazy(() => import('src/pages/company-dashboard/mail'));

export const companyDashboardRoutes: RouteObject[] = [
  {
    path: 'company-dashboard',
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <IndexPage />
      },
      {
        path: 'profile',
        children: [
          {
            index: true,
            element: <CompanyProfilePage />
          },
          {
            path: 'edit',
            element: <CompanyProfileEditPage />
          }
        ]
      },
      {
        path: 'academy',
        children: [
          {
            index: true,
            element: <AcademyDashboardPage />
          },
          {
            path: 'courses',
            children: [
              {
                path: ':courseId',
                element: <AcademyCoursePage />
              }
            ]
          }
        ]
      },
      {
        path: 'blog',
        children: [
          {
            index: true,
            element: <BlogPostListPage />
          },
          {
            path: 'create',
            element: <BlogPostCreatePage />
          },
          {
            path: ':postId',
            element: <BlogPostDetailPage />
          }
        ]
      },
      {
        path: 'candidates',
        children: [
          {
            index: true,
            element: <CandidatesListPage />
          },
          {
            path: ':candidateId',
            element: <CandidatesDetailsPage />
          },
        ]
      },
      {
        path: 'job-posts',
        children: [
          {
            index: true,
            element: <JobPostsListPage />
          },
          {
            path: ':jobPostId',
            element: <JobPostsDetailsPage />
          },
          {
            path: 'create',
            element: <JobPostsCreatePage /> 
          },
          {
            path: 'edit/:jobPostId',
            element: <JobPostsEditPage />
          }
        ]
      },
      {
        path: 'customers',
        children: [
          {
            index: true,
            element: <CustomerListPage />
          },
          {
            path: ':customerId',
            element: <CustomerDetailPage />
          },
          {
            path: ':customerId/edit',
            element: <CustomerEditPage />
          }
        ]
      },
      {
        path: 'invoices',
        children: [
          {
            index: true,
            element: <InvoiceListPage />
          },
          {
            path: ':invoiceId',
            element: <InvoiceDetailPage />
          }
        ]
      },
      {
        path: 'jobs',
        children: [
          {
            index: true,
            element: <JobBrowsePage />
          },
          {
            path: 'create',
            element: <JobCreatePage />
          },
          {
            path: 'companies',
            children: [
              {
                path: ':companyId',
                element: <CompanyDetailPage />
              }
            ]
          }
        ]
      },
      {
        path: 'logistics',
        children: [
          {
            index: true,
            element: <LogisticsDashboardPage />
          },
          {
            path: 'fleet',
            element: <LogisticsFleetPage />
          }
        ]
      },
      {
        path: 'orders',
        children: [
          {
            index: true,
            element: <OrderListPage />
          },
          {
            path: ':orderId',
            element: <OrderDetailPage />
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <ProductListPage />
          },
          {
            path: 'create',
            element: <ProductCreatePage />
          }
        ]
      },
      {
        path: 'social',
        children: [
          {
            path: 'feed',
            element: <SocialFeedPage />
          },
          {
            path: 'profile',
            element: <SocialProfilePage />
          }
        ]
      },
      {
        path: 'account',
        element: <AccountPage />
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />
      },
      {
        path: 'blank',
        element: <BlankPage />
      },
      {
        path: 'calendar',
        element: <CalendarPage />
      },
      {
        path: 'chat',
        element: <ChatPage />
      },
      {
        path: 'crypto',
        element: <CryptoPage />
      },
      {
        path: 'ecommerce',
        element: <EcommercePage />
      },
      {
        path: 'file-manager',
        element: <FileManagerPage />
      },
      {
        path: 'kanban',
        element: <KanbanPage />
      },
      {
        path: 'mail',
        element: <MailPage />
      }
    ]
  }
];
