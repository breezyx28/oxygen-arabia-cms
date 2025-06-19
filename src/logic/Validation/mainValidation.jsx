import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string, mixed, array } from 'yup';

export class MainValidation extends YupValidation {
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
    // Hero Section
    hero_cover: null,
    hero_title: null,
    hero_subtitle: null,
    hero_cta_title: null,
    hero_cta_link: null,
    hero_slider_title: null,

    // Section 1
    section_1_title: null,
    section_1_subtitle: null,
    section_1_card_1_title: null,
    section_1_card_1_subtitle: null,
    section_1_card_1_cta: null,
    section_1_card_2_title: null,
    section_1_card_2_subtitle: null,
    section_1_card_2_cta: null,
    section_1_card_3_title: null,
    section_1_card_3_subtitle: null,
    section_1_card_3_cta: null,

    // Section 2
    section_2_title: null,
    section_2_subtitle: null,

    // Section 3
    section_3_title: null,
    section_3_card_1_icon: null,
    section_3_card_1_title: null,
    section_3_card_1_cta: null,
    section_3_card_2_icon: null,
    section_3_card_2_title: null,
    section_3_card_2_cta: null,
    section_3_card_3_icon: null,
    section_3_card_3_title: null,
    section_3_card_3_cta: null,

    // Section 4
    section_4_cover: null,
    section_4_title: null,
    section_4_cta_title: null,
    section_4_cta_link: null,

    // Section 5
    section_5_title: null,
    section_5_card_img: null,

    // Section 6
    section_6_title: null,

    // Arrays
    hero_card_1: null,
    hero_card_2: null,
    hero_slider_imgs: null,
    section_2_icons: null,
    section_3_card_1_features: null,
    section_3_card_2_features: null,
    section_3_card_3_features: null,
    section_5_card_card: null,
    section_6_slider: null,
  };

  schema = object().shape({
    // Hero Section
    hero_cover: mixed()
      .nullable()
      .test('is-image', '`Hero Cover` must be a valid image URL or file path', this.validateImage),
    hero_title: string().required('Hero title is required').max(255, 'Hero title must be at most 255 characters'),
    hero_subtitle: string().required('Hero subtitle is required').max(500, 'Hero subtitle must be at most 500 characters'),
    hero_cta_title: string().required('Hero CTA title is required').max(100, 'Hero CTA title must be at most 100 characters'),
    hero_cta_link: string()
      .required('Hero CTA link is required')
      .url('Hero CTA link must be a valid URL')
      .max(255, 'Hero CTA link must be at most 255 characters'),
    hero_slider_title: string().required('Hero slider title is required').max(255, 'Hero slider title must be at most 255 characters'),

    // Section 1
    section_1_title: string().required('Section 1 title is required').max(255, 'Section 1 title must be at most 255 characters'),
    section_1_subtitle: string().required('Section 1 subtitle is required').max(500, 'Section 1 subtitle must be at most 500 characters'),
    section_1_card_1_title: string().required('Card 1 title is required').max(255, 'Card 1 title must be at most 255 characters'),
    section_1_card_1_subtitle: string().required('Card 1 subtitle is required').max(500, 'Card 1 subtitle must be at most 500 characters'),
    section_1_card_1_cta: string()
      .required('Card 1 CTA is required')
      .url('Card 1 CTA must be a valid URL')
      .max(255, 'Card 1 CTA must be at most 255 characters'),
    section_1_card_2_title: string().required('Card 2 title is required').max(255, 'Card 2 title must be at most 255 characters'),
    section_1_card_2_subtitle: string().required('Card 2 subtitle is required').max(500, 'Card 2 subtitle must be at most 500 characters'),
    section_1_card_2_cta: string()
      .required('Card 2 CTA is required')
      .url('Card 2 CTA must be a valid URL')
      .max(255, 'Card 2 CTA must be at most 255 characters'),
    section_1_card_3_title: string().required('Card 3 title is required').max(255, 'Card 3 title must be at most 255 characters'),
    section_1_card_3_subtitle: string().required('Card 3 subtitle is required').max(500, 'Card 3 subtitle must be at most 500 characters'),
    section_1_card_3_cta: string()
      .required('Card 3 CTA is required')
      .url('Card 3 CTA must be a valid URL')
      .max(255, 'Card 3 CTA must be at most 255 characters'),

    // Section 2
    section_2_title: string().required('Section 2 title is required').max(255, 'Section 2 title must be at most 255 characters'),
    section_2_subtitle: string().required('Section 2 subtitle is required').max(500, 'Section 2 subtitle must be at most 500 characters'),

    // Section 3
    section_3_title: string().required('Section 3 title is required').max(255, 'Section 3 title must be at most 255 characters'),
    section_3_card_1_icon: mixed()
      .required('Card 1 icon is required')
      .test('is-image', 'Card 1 icon must be a valid image', this.validateImage),
    section_3_card_1_title: string().required('Card 1 title is required').max(255, 'Card 1 title must be at most 255 characters'),
    section_3_card_1_cta: string()
      .required('Card 1 CTA is required')
      .url('Card 1 CTA must be a valid URL')
      .max(255, 'Card 1 CTA must be at most 255 characters'),
    section_3_card_2_icon: mixed()
      .required('Card 2 icon is required')
      .test('is-image', 'Card 2 icon must be a valid image', this.validateImage),
    section_3_card_2_title: string().required('Card 2 title is required').max(255, 'Card 2 title must be at most 255 characters'),
    section_3_card_2_cta: string()
      .required('Card 2 CTA is required')
      .url('Card 2 CTA must be a valid URL')
      .max(255, 'Card 2 CTA must be at most 255 characters'),
    section_3_card_3_icon: mixed()
      .required('Card 3 icon is required')
      .test('is-image', 'Card 3 icon must be a valid image', this.validateImage),
    section_3_card_3_title: string().required('Card 3 title is required').max(255, 'Card 3 title must be at most 255 characters'),
    section_3_card_3_cta: string()
      .required('Card 3 CTA is required')
      .url('Card 3 CTA must be a valid URL')
      .max(255, 'Card 3 CTA must be at most 255 characters'),

    // Section 4
    section_4_cover: mixed()
      .required('Section 4 cover is required')
      .test('is-image', 'Section 4 cover must be a valid image', this.validateImage),
    section_4_title: string().required('Section 4 title is required').max(255, 'Section 4 title must be at most 255 characters'),
    section_4_cta_title: string().required('Section 4 CTA title is required').max(100, 'Section 4 CTA title must be at most 100 characters'),
    section_4_cta_link: string()
      .required('Section 4 CTA link is required')
      .url('Section 4 CTA link must be a valid URL')
      .max(255, 'Section 4 CTA link must be at most 255 characters'),

    // Section 5
    section_5_title: string().required('Section 5 title is required').max(255, 'Section 5 title must be at most 255 characters'),
    section_5_card_img: mixed()
      .required('Section 5 card image is required')
      .test('is-image', 'Section 5 card image must be a valid image', this.validateImage),

    // Section 6
    section_6_title: string().required('Section 6 title is required').max(255, 'Section 6 title must be at most 255 characters'),

    // Arrays (basic validation - you might want to add more specific validation for array items)
    hero_card_1: array().required('Hero card 1 is required'),
    hero_card_2: array().required('Hero card 2 is required'),
    hero_slider_imgs: array().required('Hero slider images are required'),
    section_2_icons: array().required('Section 2 icons are required'),
    section_3_card_1_features: array().required('Section 3 card 1 features are required'),
    section_3_card_2_features: array().required('Section 3 card 2 features are required'),
    section_3_card_3_features: array().required('Section 3 card 3 features are required'),
    section_5_card_card: array().required('Section 5 card is required'),
    section_6_slider: array().required('Section 6 slider is required'),
  });
}