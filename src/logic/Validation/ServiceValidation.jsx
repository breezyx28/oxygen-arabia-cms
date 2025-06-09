import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string, mixed } from 'yup';

export class ServiceValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    name: null,
    description: null,
    page_title: null,
    page_subtitle: null,
  };

  schema = object().shape({
    name: string().required('Name is required'),
    description: string().required('Description is required'),

    page_title: string().required('Service Page title is required'),
    page_subtitle: string().required('Service Page subtitle is required'),

  });
}
