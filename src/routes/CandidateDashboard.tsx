import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';
import {Layout as DashboardLayout} from 'src/layouts/dashboard';

const IndexPage = lazy(() => import('src/pages/candidateDashboard/index'));

// Academy
const AcademycandidateDashboardPage = lazy(() => import('src/pages/candidateDashboard/academy/dashboard'));
const AcademyCoursePage = lazy(() => import('src/pages/candidateDashboard/academy/course'));

// Blog
const BlogPostListPage = lazy(() => import('src/pages/candidateDashboard/blog/list'));
const BlogPostDetailPage = lazy(() => import('src/pages/candidateDashboard/blog/detail'));
const BlogPostCreatePage = lazy(() => import('src/pages/candidateDashboard/blog/create'));
// Customer
const CustomerListPage = lazy(() => import('src/pages/candidateDashboard/customers/list'));
const CustomerDetailPage = lazy(() => import('src/pages/candidateDashboard/customers/detail'));
const CustomerEditPage = lazy(() => import('src/pages/candidateDashboard/customers/edit'));

// Invoice
const InvoiceListPage = lazy(() => import('src/pages/candidateDashboard/invoices/list'));
const InvoiceDetailPage = lazy(() => import('src/pages/candidateDashboard/invoices/detail'));

// Job
const JobBrowsePage = lazy(() => import('src/pages/candidateDashboard/jobs/browse'));
const JobCreatePage = lazy(() => import('src/pages/candidateDashboard/jobs/create'));
const CompanyDetailPage = lazy(() => import('src/pages/candidateDashboard/jobs/companies/detail'));

// Logistics
const LogisticscandidateDashboardPage = lazy(() => import('src/pages/candidateDashboard/logistics/dashboard'));
const LogisticsFleetPage = lazy(() => import('src/pages/candidateDashboard/logistics/fleet'));

// Social
const SocialFeedPage = lazy(() => import('src/pages/candidateDashboard/social/feed'));
const SocialProfilePage = lazy(() => import('src/pages/candidateDashboard/social/profile'));

// Other
const AccountPage = lazy(() => import('src/pages/candidateDashboard/account'));
const AnalyticsPage = lazy(() => import('src/pages/candidateDashboard/analytics'));
const BlankPage = lazy(() => import('src/pages/candidateDashboard/blank'));
const CalendarPage = lazy(() => import('src/pages/candidateDashboard/calendar'));
const ChatPage = lazy(() => import('src/pages/candidateDashboard/chat'));
const CryptoPage = lazy(() => import('src/pages/candidateDashboard/crypto'));
const EcommercePage = lazy(() => import('src/pages/candidateDashboard/ecommerce'));
const FileManagerPage = lazy(() => import('src/pages/candidateDashboard/file-manager'));
const KanbanPage = lazy(() => import('src/pages/candidateDashboard/kanban'));
const MailPage = lazy(() => import('src/pages/candidateDashboard/mail'));

export const candidateDashboardRoutes: RouteObject[] = [
  {
    path: 'candidateDashboard',
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
        path: 'academy',
        children: [
          {
            index: true,
            element: <AcademycandidateDashboardPage />
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
            element: <LogisticscandidateDashboardPage />
          },
          {
            path: 'fleet',
            element: <LogisticsFleetPage />
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
