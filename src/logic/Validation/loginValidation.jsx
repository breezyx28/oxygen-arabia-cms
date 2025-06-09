import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string } from 'yup';

export class LoginValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    email: null,
    password: null,
  };

  schema = object().shape({
    email: string().email().required(),
    password: string().required(),
  });
}
