import { Helmet } from 'react-helmet-async';
import { ContactPageDetailsView } from 'src/sections/contact-page-details/view';

// ----------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title> Contact Page Details | Oxygen Arabia </title>
      </Helmet>

      <ContactPageDetailsView />
    </>
  );
}
