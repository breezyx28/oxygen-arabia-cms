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
import { rtkQueryErrorLogger } from './HandleGlobalErrors';
import { formApi } from '../endpoints/form';
import { bannerApi } from '../endpoints/banner';

export const Middlewares = [
  rtkQueryErrorLogger,
  loginApi.middleware,
  servicesApi.middleware,
  subservicesApi.middleware,
  mainApi.middleware,
  bannerApi.middleware,
  formApi.middleware,
  partnersApi.middleware,
  projectsApi.middleware,
  projectPageDetailsApi.middleware,
  missionsApi.middleware,
  contactsApi.middleware,
  footerApi.middleware,
  contactPageDetailsApi.middleware,
  aboutPageDetailsApi.middleware,
  usersMessagesApi.middleware,
  statisticsApi.middleware,
  profileApi.middleware
];
