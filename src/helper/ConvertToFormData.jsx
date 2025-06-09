const convertToFormData = (data) => {
  let formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return formData;
};

export default convertToFormData;
