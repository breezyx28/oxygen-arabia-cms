import { Helmet } from 'react-helmet-async';
import { MissionView } from 'src/sections/missions/view';

// ----------------------------------------------------------------------

export default function MissionPage() {
  return (
    <>
      <Helmet>
        <title> Mission | Oxygen Arabia </title>
      </Helmet>

      <MissionView />
    </>
  );
}
