import { Helmet } from 'react-helmet-async';
import { PartnersView } from 'src/sections/partners/view';


// ----------------------------------------------------------------------

export default function PartnersPage() {
  return (
    <>
      <Helmet>
        <title> Partners | Oxygen Arabia </title>
      </Helmet>

      <PartnersView />
    </>
  );
}
