import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';
import {Layout as DashboardLayout} from 'src/layouts/dashboard';

const IndexPage = lazy(() => import('src/pages/companyDashboard/index'));

// Academy
const AcademyDashboardPage = lazy(() => import('src/pages/companyDashboard/academy/dashboard'));
const AcademyCoursePage = lazy(() => import('src/pages/companyDashboard/academy/course'));

// Customer
const CustomerListPage = lazy(() => import('src/pages/companyDashboard/customers/list'));
const CustomerDetailPage = lazy(() => import('src/pages/companyDashboard/customers/detail'));
const CustomerEditPage = lazy(() => import('src/pages/companyDashboard/customers/edit'));

// Invoice
const InvoiceListPage = lazy(() => import('src/pages/companyDashboard/invoices/list'));
// Job
const JobBrowsePage = lazy(() => import('src/pages/companyDashboard/jobs/browse'));
const JobCreatePage = lazy(() => import('src/pages/companyDashboard/jobs/create'));
const CompanyDetailPage = lazy(() => import('src/pages/companyDashboard/jobs/companies/detail'));

// Logistics
const LogisticsDashboardPage = lazy(() => import('src/pages/companyDashboard/logistics/dashboard'));
// Social
const SocialFeedPage = lazy(() => import('src/pages/companyDashboard/social/feed'));
const SocialProfilePage = lazy(() => import('src/pages/companyDashboard/social/profile'));

// Other
const AccountPage = lazy(() => import('src/pages/companyDashboard/account'));
const AnalyticsPage = lazy(() => import('src/pages/companyDashboard/analytics'));
const BlankPage = lazy(() => import('src/pages/companyDashboard/blank'));
const CalendarPage = lazy(() => import('src/pages/companyDashboard/calendar'));
const ChatPage = lazy(() => import('src/pages/companyDashboard/chat'));
const CryptoPage = lazy(() => import('src/pages/companyDashboard/crypto'));
const EcommercePage = lazy(() => import('src/pages/companyDashboard/ecommerce'));
const FileManagerPage = lazy(() => import('src/pages/companyDashboard/file-manager'));
const KanbanPage = lazy(() => import('src/pages/companyDashboard/kanban'));
const MailPage = lazy(() => import('src/pages/companyDashboard/mail'));

export const companDashboardRoutes: RouteObject[] = [
  {
    path: 'companyDashboard',
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
