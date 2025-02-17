import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from 'src/layouts/candidate-dashboard';

const IndexPage = lazy(() => import('src/pages/candidate-dashboard/index'));

// Profile
const CandidateProfilePage = lazy(() => import('src/pages/candidate-dashboard/profile'));
const CandidateProfileEditPage = lazy(() => import('src/pages/candidate-dashboard/profile/edit'));

// jobs
const JobListPage = lazy(() => import('src/pages/candidate-dashboard/jobs/list'));
const JobRecommendedListPage = lazy(() => import('src/pages/candidate-dashboard/jobs/recommeneded'));
const JobDetailsPage = lazy(() => import('src/pages/candidate-dashboard/jobs/detail'));

// companies
const CompanyListPage = lazy(() => import('src/pages/candidate-dashboard/companies/list'));
const CompanyDetailsPage = lazy(() => import('src/pages/candidate-dashboard/companies/detail'));

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
        path: 'profile',
        children: [
          {
            index: true,
            element: <CandidateProfilePage />
          },
          {
            path: 'edit',
            element: <CandidateProfileEditPage />
          }
        ]
      },
      {
        path: 'jobs',
        children: [
          {
            index: true,
            element: <JobListPage />
          },
          {
            path: ':jobId',
            element: <JobDetailsPage />
          },
          {
            path: 'recommended',
            element: <JobRecommendedListPage /> 
          }
        ]
      },
      {
        path: 'companies',
        children: [
          {
            index: true,
            element: <CompanyListPage />
          },
          {
            path: ':companyId',
            element: <CompanyDetailsPage />
          },
          {
            path: 'recommended',
            element: <JobRecommendedListPage /> 
          }
        ]
      }
    ]
  }
];
