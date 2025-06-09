import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string } from 'yup';

export class FooterValidation extends YupValidation {
  constructor() {
    super();
  }

  schema = object().shape({
    copyrights: string().nullable().max(255, 'Copyrights must not exceed 255 characters'),
  });
}