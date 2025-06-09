import { Helmet } from 'react-helmet-async';
import { AboutPageDetailsView } from 'src/sections/about-page-details/view';

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title> About Page Details | Oxygen Arabia </title>
      </Helmet>

      <AboutPageDetailsView />
    </>
  );
}
