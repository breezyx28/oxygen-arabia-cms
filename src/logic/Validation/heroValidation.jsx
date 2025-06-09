import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string, mixed } from 'yup';

export class HeroValidation extends YupValidation {
  constructor() {
    super();
  }

  supportedFormats = ['image/png', 'image/svg+xml', 'image/jpeg'];

  validateImage = (value) => {
    if (!value) return true; // Skip validation if the value is null or empty

    // If the value is a File object, check its MIME type
    if (value instanceof File) {
      return this.supportedFormats.includes(value.type);
    }

    // If the value is a string (e.g., URL or file path), check its extension
    if (typeof value === 'string') {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      return imageExtensions.some((ext) => value.toLowerCase().endsWith(ext));
    }

    // If the value is neither a File nor a string, it's invalid
    return false;
  };

  form = {
    title: null,
    subtitle: null,
    button_text: null,
    image: null,
    sm_img: null,
  };

  schema = object().shape({
    title: string().nullable(),
    subtitle: string().nullable(),
    button_text: string().nullable(),
    image: mixed()
      .nullable()
      .test('is-image', 'Section Image must be a valid image URL or file path', this.validateImage),
    sm_img: mixed()
      .nullable()
      .test('is-image', 'Section Small Image must be a valid image URL or file path', this.validateImage),
  });
}