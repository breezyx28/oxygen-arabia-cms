import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string, mixed } from 'yup';

export class PartnerValidation extends YupValidation {
  constructor() {
    super();
  }

  supportedFormats = ['image/png', 'image/svg+xml', 'image/jpeg'];

  form = {
    logo: null,
  };

  schema = object().shape({
    logo: mixed()
      .required('Logo is required')
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
