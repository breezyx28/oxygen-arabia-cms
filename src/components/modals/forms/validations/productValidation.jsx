import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string, number, mixed, array } from 'yup';

export class ProductValidation extends YupValidation {
  constructor() {
    super();
  }

  supportedFormats = ['image/png', 'image/svg+xml', 'image/jpeg'];

  form = {
    name: null,
    description: null,
    image_file: null,
    price: null,
    sale_price: null,
    variations: null,
    category_id: null,
    brand_id: null,
  };

  schema = object().shape({
    name: string().required('Name is required'),
    description: string().required('Description is required'),
    image_file: mixed()
      .required('File is required')
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
    brand_id: number().min(0).required('brand id is required'),
    category_id: number().min(0).required('category id is required'),
    price: number()
      .min(0)
      .positive('Price must be a positive number')
      .required('price is required'),
    sale_price: number()
      .min(0)
      .positive('Sale Price must be a positive number')
      .required('sale price id is required'),
    variations: array().required('variations is required'),
  });
}
