import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string } from 'yup';

export class AboutPageDetailsValidation extends YupValidation {
  constructor() {
    super();
  }

  // Helper function to validate image URLs or file paths
  validateImage = (value) => {
    if (!value) return true; // Skip validation if the value is null or empty

    // Check if the value is a valid image URL or file path
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const isImage = imageExtensions.some((ext) => value.toLowerCase().endsWith(ext));

    return isImage;
  };

  schema = object().shape({
    hero_title: string().nullable().max(255, 'Hero title must not exceed 255 characters'),
    hero_subtitle: string().nullable().max(255, 'Hero subtitle must not exceed 255 characters'),
    section_1_img_1: string()
      .nullable()
      .test('is-image', 'Section 1 Image 1 must be a valid image URL or file path', this.validateImage),
    section_1_img_2: string()
      .nullable()
      .test('is-image', 'Section 1 Image 2 must be a valid image URL or file path', this.validateImage),
    section_1_title: string().nullable().max(255, 'Section 1 Title must not exceed 255 characters'),
    section_1_description: string().nullable().max(500, 'Section 1 Description must not exceed 255 characters'),
    section_2_img: string()
      .nullable()
      .test('is-image', 'Section 2 Image must be a valid image URL or file path', this.validateImage),
    section_2_part_1_title: string().nullable().max(255, 'Section 2 Part 1 Title must not exceed 255 characters'),
    section_2_part_1_description: string().nullable().max(500, 'Section 2 Part 1 Description must not exceed 255 characters'),
    section_2_part_2_title: string().nullable().max(255, 'Section 2 Part 2 Title must not exceed 255 characters'),
    section_2_part_2_description: string().nullable().max(500, 'Section 2 Part 2 Description must not exceed 255 characters'),
  });
}