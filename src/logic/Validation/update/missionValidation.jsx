import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string, mixed } from 'yup';

export class UpdateMissionValidation extends YupValidation {
  constructor() {
    super();
  }


  form = {
    title: null,
    description: null,
  };

  schema = object().shape({
    title: string().nullable(),
    description: string().required(),
  });
}
