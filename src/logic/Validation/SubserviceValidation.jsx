import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string, mixed, number } from 'yup';

export class SubserviceValidation extends YupValidation {
  constructor() {
    super();
  }

  supportedFormats = ['image/png', 'image/svg+xml', 'image/jpeg'];

  form = {
    service_id: null,
    image: null,
    title: null,
    subtitle: null,
    description: null,
    card_description: null,
  };

  schema = object().shape({
    service_id: number().min(0).required('Service is required'),
    title: string().required('Title is required'),
    subtitle: string().required('Subtitle is required'),
    description: string().required('Description is required'),
    card_description: string().required('Card description is required'),
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
    card_image: mixed()
      .required('Card Image is required')
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
