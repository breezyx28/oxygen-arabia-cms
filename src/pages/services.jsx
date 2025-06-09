import { Helmet } from 'react-helmet-async';

import { ServiceView } from 'src/sections/services/view';

// ----------------------------------------------------------------------

export default function ServicePage() {
  return (
    <>
      <Helmet>
        <title> Service | Oxygen Arabia </title>
      </Helmet>

      <ServiceView />
    </>
  );
}
