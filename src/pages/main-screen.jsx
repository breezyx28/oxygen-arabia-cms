import { Helmet } from 'react-helmet-async';
import MainPage from 'src/sections/heroes/view/main-view';


// ----------------------------------------------------------------------

export default function MainScreenPage() {
  return (
    <>
      <Helmet>
        <title> Main Screen | Oxygen Arabia </title>
      </Helmet>

      <MainPage />
    </>
  );
}
