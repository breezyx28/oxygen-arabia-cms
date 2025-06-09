import { Helmet } from 'react-helmet-async';
import { ProjectPageDetailsView } from 'src/sections/project-page-details/view';

// ----------------------------------------------------------------------

export default function ProjectPageDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Project Page Details | Oxygen Arabia </title>
      </Helmet>

      <ProjectPageDetailsView />
    </>
  );
}
