import { Helmet } from 'react-helmet-async';
import { FooterView } from 'src/sections/footer/view';

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title> Footer | Oxygen Arabia </title>
      </Helmet>

      <FooterView />
    </>
  );
}
