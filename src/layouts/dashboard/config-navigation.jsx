import { Call, Category, Colorfilter, Copyright, Data2, ElementPlus, Flag2, ForwardItem, Grid5, Hierarchy3, Layer, Shop, TableDocument, Task, UserSquare } from 'iconsax-react';
import SvgColor from 'src/components/svg-color';
// import { EmojiHappy } from 'iconsax-react';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Home',
    path: '/dashboard/main',
    icon: <Grid5 color="#697689" variant="Bulk" />,
  },
  // {
  //   title: 'Partners',
  //   path: '/dashboard/partners',
  //   icon: <Colorfilter color="#697689" variant="Bulk" />,
  // },
  // {
  //   title: 'Missions',
  //   path: '/dashboard/missions',
  //   icon: <Flag2 color="#697689" variant="Bulk" />,
  // },
  // {
  //   title: 'Projects',
  //   path: '/dashboard/projects',
  //   icon: <Task color="#697689" variant="Bulk" />,
  // },
  // {
  //   title: 'Services',
  //   path: '/dashboard/services',
  //   icon: <ElementPlus color="#697689" variant="Bulk" />,
  // },
  // {
  //   title: 'Subervices',
  //   path: '/dashboard/sub-services',
  //   icon: <Data2 color="#697689" variant="Bulk" />,
  // },
  // {
  //   title: 'Contact',
  //   path: '/dashboard/contact',
  //   icon: <Call color="#697689" variant="Bulk" />,
  // },
  // {
  //   title: 'Contact Page Details',
  //   path: '/dashboard/contact-page',
  //   icon: <TableDocument color="#697689" variant="Bulk" />,
  // },
  // {
  //   title: 'About Page Details',
  //   path: '/dashboard/about-page',
  //   icon: <TableDocument color="#697689" variant="Bulk" />,
  // },
  // {
  //   title: 'Project Page Details',
  //   path: '/dashboard/project-page',
  //   icon: <TableDocument color="#697689" variant="Bulk" />,
  // },
  // {
  //   title: 'users feedback',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'Footer',
  //   path: '/dashboard/footer',
  //   icon: <Copyright color="#697689" variant="Bulk" />,
  // },

];

export default navConfig;
