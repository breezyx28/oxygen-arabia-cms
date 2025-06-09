import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export class YupValidation {
  model = null;
  createError = null;
  serverErrors = null;

  constructor() {
    this.model = this;
  }

  controller = () => {
    let formController = useForm({
      resolver: yupResolver(this.model.schema),
      defaultValues: this.model.form,
    });
    this.createError = formController.setError;
    return formController;
  };

  displayError = (server, message) => {
    this.serverErrors = server?.data?.errors;

    if (message) {
      alert(message);
      return;
    }
    if (server?.errors) {
      alert(server?.errors);
      return;
    }

    if (typeof this.serverErrors === 'string') {
      alert(this.serverErrors);
    } else {
      for (let key in this.serverErrors) {
        const value = this.serverErrors[key];
        this.createError(key, {
          type: 'manual',
          message: value,
        });
      }
    }
  };
}
