import { YupValidation } from 'src/logic/Validation/YupValidation';
import { object, string, mixed } from 'yup';

export class MissionValidation extends YupValidation {
  constructor() {
    super();
  }


  form = {
    title: null,
    description: null,
  };

  schema = object().shape({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
  });
}
