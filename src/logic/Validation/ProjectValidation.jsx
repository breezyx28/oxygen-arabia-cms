import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string, mixed } from 'yup';

export class ProjectValidation extends YupValidation {
  constructor() {
    super();
  }

  supportedFormats = ['image/png', 'image/svg+xml', 'image/jpeg'];

  form = {
    image: null,
    title: null,
    subtitle: null,
    page_title: null,
    page_subtitle: null,
    description: null,
    card_description: null,
  };

  schema = object().shape({
    title: string().required('Title is required'),
    subtitle: string().required('Subtitle is required'),

    page_title: string().required('Page Title is required'),
    page_subtitle: string().required('Page Subtitle is required'),

    description: string().required('Description is required'),
    card_description: string().required('Card Description is required'),

    image: mixed()
      .required('Image is required')
      .test('fileFormat', 'Unsupported file format', (value) => {
        if (value) {
          return this.supportedFormats.includes(value.type);
        }
        return true; // Skip validation if no file is provided
      })
      .test('fileSize', 'File size must not exceed 1 MB', (value) => {
        if (value) {
          return value.size <= 1048576; // 1 MB in bytes
        }
        return true; // Skip validation if no file is provided
      }),
  });
}
