import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const FooterPage = lazy(() => import('src/pages/footer'));
export const ContactPage = lazy(() => import('src/pages/contacts'));
export const ContactPageDetailsPage = lazy(() => import('src/pages/contact-page-details'));
export const AboutPageDetailsPage = lazy(() => import('src/pages/about-page-details'));
export const ProjectPageDetailsPage = lazy(() => import('src/pages/project-page-details'));

export const MainPage = lazy(() => import('src/pages/main-screen'));
export const MissionPage = lazy(() => import('src/pages/missions'));
export const PartnersPage = lazy(() => import('src/pages/partners'));
export const ProjectsPage = lazy(() => import('src/pages/projects'));
export const ServicePage = lazy(() => import('src/pages/services'));
export const SubServicesPage = lazy(() => import('src/pages/sub-services'));

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: "dashboard", element: <IndexPage />, index: true },
        {
          path: "dashboard", children: [
            { path: 'profile', element: <ProfilePage /> },
            { path: 'main-screen', element: <MainPage /> },
            { path: 'missions', element: <MissionPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'contact-page', element: <ContactPageDetailsPage /> },
            { path: 'about-page', element: <AboutPageDetailsPage /> },
            { path: 'project-page', element: <ProjectPageDetailsPage /> },
            { path: 'projects', element: <ProjectsPage /> },
            { path: 'partners', element: <PartnersPage /> },
            { path: 'services', element: <ServicePage /> },
            { path: 'sub-services', element: <SubServicesPage /> },
            { path: 'footer', element: <FooterPage /> },
            { path: 'user', element: <UserPage /> },
            { path: 'blog', element: <BlogPage /> },
          ]
        },
      ],
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
