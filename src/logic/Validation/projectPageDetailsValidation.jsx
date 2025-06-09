import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string } from 'yup';

export class ProjectPageDetailsValidation extends YupValidation {
  constructor() {
    super();
  }

  schema = object().shape({
    title: string().nullable().max(255, 'Title must not exceed 255 characters'),
    subtitle: string().nullable().max(255, 'Subtitle must not exceed 255 characters'),
    description: string().nullable().max(255, 'Description must not exceed 255 characters'),
  });
}