import { Helmet } from 'react-helmet-async';

import { SubServicesView } from 'src/sections/sub-services/view';

// ----------------------------------------------------------------------

export default function SubServicesPage() {
  return (
    <>
      <Helmet>
        <title> Sub Service | Oxygen Arabia </title>
      </Helmet>

      <SubServicesView />
    </>
  );
}
