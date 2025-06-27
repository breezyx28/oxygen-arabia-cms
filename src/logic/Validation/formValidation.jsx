import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string, mixed, array, boolean } from 'yup';

export class FormValidation extends YupValidation {
  constructor() {
    super();
  }

  supportedFormats = ['image/png', 'image/svg+xml', 'image/jpeg', 'image/webp', 'image/gif'];

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
    // Form Fields
    page_name: null,
    form_header_title: null,
    form_direction: null,
    form_person_img: null,
    form_person_qoute: null,
    form_person_name: null,
    form_person_position: null,
    input_first_name_label: null,
    input_first_name_placeholder: null,
    input_last_name_label: null,
    input_last_name_placeholder: null,
    input_email_label: null,
    input_email_placeholder: null,
    input_phone_label: null,
    input_phone_placeholder: null,
    input_company_name_label: null,
    input_company_name_placeholder: null,
    input_company_size_label: null,
    input_company_size_placeholder: null,
    // option_most_interested_options: null,
    form_btn_title: null,
    form_footer: null,
    is_active: null,
  };

  schema = object().shape({
    page_name: string().required().max(255),
    form_header_title: string().required().max(500),
    form_direction: string().required().max(100),
    form_person_img: mixed().nullable().test('is-image', 'Person image must be valid', this.validateImage),
    form_person_qoute: string().required().max(255),
    form_person_name: string().required().max(255),
    form_person_position: string().required().max(255),
    input_first_name_label: string().required().max(255),
    input_first_name_placeholder: string().required().max(255),
    input_last_name_label: string().required().max(255),
    input_last_name_placeholder: string().required().max(255),
    input_email_label: string().required().max(255),
    input_email_placeholder: string().required().max(255),
    input_phone_label: string().required().max(255),
    input_phone_placeholder: string().required().max(255),
    input_company_name_label: string().required().max(255),
    input_company_name_placeholder: string().required().max(255),
    input_company_size_label: string().required().max(255),
    input_company_size_placeholder: string().required().max(255),
    // option_most_interested_options: array().required(),
    form_btn_title: string().required().max(255),
    form_footer: string().required().max(255),
    is_active: boolean().nullable(),
  });
}