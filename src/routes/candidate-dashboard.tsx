import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from 'src/layouts/candidate-dashboard';

const IndexPage = lazy(() => import('src/pages/candidate-dashboard/index'));

// Academy
const AcademyDashboardPage = lazy(() => import('src/pages/candidate-dashboard/academy/dashboard'));
const AcademyCoursePage = lazy(() => import('src/pages/candidate-dashboard/academy/course'));

// Blog
const BlogPostListPage = lazy(() => import('src/pages/candidate-dashboard/blog/list'));
const BlogPostDetailPage = lazy(() => import('src/pages/candidate-dashboard/blog/detail'));
const BlogPostCreatePage = lazy(() => import('src/pages/candidate-dashboard/blog/create'));

// Customer
const CustomerListPage = lazy(() => import('src/pages/candidate-dashboard/customers/list'));
const CustomerDetailPage = lazy(() => import('src/pages/candidate-dashboard/customers/detail'));
const CustomerEditPage = lazy(() => import('src/pages/candidate-dashboard/customers/edit'));

// Invoice
const InvoiceListPage = lazy(() => import('src/pages/candidate-dashboard/invoices/list'));
const InvoiceDetailPage = lazy(() => import('src/pages/candidate-dashboard/invoices/detail'));

// Job
const JobBrowsePage = lazy(() => import('src/pages/candidate-dashboard/jobs/browse'));
const JobCreatePage = lazy(() => import('src/pages/candidate-dashboard/jobs/create'));
const CompanyDetailPage = lazy(() => import('src/pages/candidate-dashboard/jobs/companies/detail'));

// Logistics
const LogisticsDashboardPage = lazy(() => import('src/pages/candidate-dashboard/logistics/dashboard'));
const LogisticsFleetPage = lazy(() => import('src/pages/candidate-dashboard/logistics/fleet'));

// Order
const OrderListPage = lazy(() => import('src/pages/candidate-dashboard/orders/list'));
const OrderDetailPage = lazy(() => import('src/pages/candidate-dashboard/orders/detail'));

// Product
const ProductListPage = lazy(() => import('src/pages/candidate-dashboard/products/list'));
const ProductCreatePage = lazy(() => import('src/pages/candidate-dashboard/products/create'));

// Social
const SocialFeedPage = lazy(() => import('src/pages/candidate-dashboard/social/feed'));
const SocialProfilePage = lazy(() => import('src/pages/candidate-dashboard/social/profile'));

// Other
const AccountPage = lazy(() => import('src/pages/candidate-dashboard/account'));
const AnalyticsPage = lazy(() => import('src/pages/candidate-dashboard/analytics'));
const BlankPage = lazy(() => import('src/pages/candidate-dashboard/blank'));
const CalendarPage = lazy(() => import('src/pages/candidate-dashboard/calendar'));
const ChatPage = lazy(() => import('src/pages/candidate-dashboard/chat'));
const CryptoPage = lazy(() => import('src/pages/candidate-dashboard/crypto'));
const EcommercePage = lazy(() => import('src/pages/candidate-dashboard/ecommerce'));
const FileManagerPage = lazy(() => import('src/pages/candidate-dashboard/file-manager'));
const KanbanPage = lazy(() => import('src/pages/candidate-dashboard/kanban'));
const MailPage = lazy(() => import('src/pages/candidate-dashboard/mail'));

export const candidateDashboardRoutes: RouteObject[] = [
  {
    path: 'candidate-dashboard',
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
