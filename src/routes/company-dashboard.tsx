import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from 'src/layouts/company-dashboard';

const IndexPage = lazy(() => import('src/pages/company-dashboard/index'));

// JobPosts
const JobPostsCreatePage = lazy(() => import('src/pages/company-dashboard/job-posts/create'));
const JobPostsListPage = lazy(() => import('src/pages/company-dashboard/job-posts/list'));
const ApplicationsListPage = lazy(() => import('src/pages/company-dashboard/job-posts/applications'));
const JobPostsDetailsPage = lazy(() => import('src/pages/company-dashboard/job-posts/detail'));
const JobPostsEditPage = lazy(() => import('src/pages/company-dashboard/job-posts/edit'));

// candidates
const CandidatesListPage = lazy(() => import('src/pages/company-dashboard/candidates/list'))
const CandidatesDetailsPage = lazy(() => import('src/pages/company-dashboard/candidates/detail'))

// Company Profile
const CompanyProfilePage = lazy(() => import('src/pages/company-dashboard/profile'));
const CompanyProfileEditPage = lazy(() => import('src/pages/company-dashboard/profile/edit'));

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
            path: 'applications/:jobPostId',
            element: <ApplicationsListPage />
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
      }
    ]
  }
];
