import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string, mixed, ref } from 'yup';

export class ProfileValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
  };

  schema = object().shape({
    name: string().nullable(),
    email: string().email().nullable(),
    password: string().nullable(),
    password_confirmation: string()
      .nullable()
      .oneOf([ref('password'), null], 'Passwords must match'),
  });
}
