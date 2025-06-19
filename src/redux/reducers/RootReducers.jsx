import { aboutPageDetailsApi } from '../endpoints/aboutPageDetails';
import { contactPageDetailsApi } from '../endpoints/contactPageDetails';
import { contactsApi } from '../endpoints/contacts';
import { footerApi } from '../endpoints/footer';
import { mainApi } from '../endpoints/main';
import { loginApi } from '../endpoints/login';
import { missionsApi } from '../endpoints/missions';
import { partnersApi } from '../endpoints/partners';
import { profileApi } from '../endpoints/profile';
import { projectPageDetailsApi } from '../endpoints/projectPageDetails';
import { projectsApi } from '../endpoints/projects';
import { servicesApi } from '../endpoints/services';
import { statisticsApi } from '../endpoints/statistics';
import { subservicesApi } from '../endpoints/sub-services';
import { usersMessagesApi } from '../endpoints/usersMessages';

export const Reducers = {
  // Add the generated reducer as a specific top-level slice
  [loginApi.reducerPath]: loginApi.reducer,
  [servicesApi.reducerPath]: servicesApi.reducer,
  [subservicesApi.reducerPath]: subservicesApi.reducer,
  [mainApi.reducerPath]: mainApi.reducer,
  [partnersApi.reducerPath]: partnersApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [projectPageDetailsApi.reducerPath]: projectPageDetailsApi.reducer,
  [missionsApi.reducerPath]: missionsApi.reducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
  [footerApi.reducerPath]: footerApi.reducer,
  [contactPageDetailsApi.reducerPath]: contactPageDetailsApi.reducer,
  [aboutPageDetailsApi.reducerPath]: aboutPageDetailsApi.reducer,
  [usersMessagesApi.reducerPath]: usersMessagesApi.reducer,
  [statisticsApi.reducerPath]: statisticsApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
};
