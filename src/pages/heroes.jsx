import { Helmet } from 'react-helmet-async';
import { HeroView } from 'src/sections/heroes/view';


// ----------------------------------------------------------------------

export default function HeroesPage() {
  return (
    <>
      <Helmet>
        <title> Hero | Oxygen Arabia </title>
      </Helmet>

      <HeroView />
    </>
  );
}
