import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';

import { IssuerGuard } from 'src/guards/issuer-guard';
import { GuestGuard } from 'src/guards/guest-guard';
import { Layout as AuthLayout } from 'src/layouts/auth/classic-layout';
import { Issuer } from 'src/utils/auth';

const CandidateLoginPage = lazy(() => import('src/pages/auth/candidate/login'));
const CandidateRegisterPage = lazy(() => import('src/pages/auth/candidate/register'));

const CompanyLoginPage = lazy(() => import('src/pages/auth/company/login'));
const CompanyRegisterPage = lazy(() => import('src/pages/auth/company/register'));

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'candidate',
        element: (
          <IssuerGuard issuer={Issuer.JWT}>
            <GuestGuard>
              <AuthLayout>
                <Outlet />
              </AuthLayout>
            </GuestGuard>
          </IssuerGuard>
        ),
        children: [
          {
            path: 'login',
            element: <CandidateLoginPage />
          },
          {
            path: 'register',
            element: <CandidateRegisterPage />
          }
        ]
      },
      {
        path: 'company',
        element: (
          <IssuerGuard issuer={Issuer.JWT}>
            <GuestGuard>
              <AuthLayout>
                <Outlet />
              </AuthLayout>
            </GuestGuard>
          </IssuerGuard>
        ),
        children: [
          {
            path: 'login',
            element: <CompanyLoginPage />
          },
          {
            path: 'register',
            element: <CompanyRegisterPage />
          }
        ]
      },
    ]
  }
];
