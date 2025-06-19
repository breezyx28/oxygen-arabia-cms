export function objectToFormData(obj, form = new FormData(), namespace = '') {
  for (let property in obj) {
    if (!obj.hasOwnProperty(property) || obj[property] === undefined || obj[property] === null)
      continue;
    const formKey = namespace ? `${namespace}[${property}]` : property;
    const value = obj[property];

    if (value instanceof File) {
      form.append(formKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((element, index) => {
        if (element instanceof File) {
          form.append(`${formKey}[${index}]`, element);
        } else if (typeof element === 'object' && element !== null) {
          objectToFormData(element, form, `${formKey}[${index}]`);
        } else if (element !== undefined && element !== null) {
          form.append(`${formKey}[${index}]`, element);
        }
      });
    } else if (typeof value === 'object') {
      objectToFormData(value, form, formKey);
    } else {
      form.append(formKey, value);
    }
  }
  return form;
}
