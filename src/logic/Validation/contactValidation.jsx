import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string, mixed } from 'yup';

export class ContactValidation extends YupValidation {
  constructor() {
    super();
  }


  form = {
    address: null,
    phone: null,
    email: null,
  };

  schema = object().shape({
    address: string().nullable(),
    phone: string()
      .matches(/^\+?[0-9]{10,15}$/, "Phone number must be between 10 and 15 digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits")
      .nullable(),
    email: string().email().nullable(),
  });
}
