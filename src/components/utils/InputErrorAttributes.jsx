const InputErrorAttributes = ({ inputName, yupError }) => {
  return {
    error: yupError[inputName]?.message ? true : false,
    helperText: yupError[inputName]?.message ?? '',
  };
};

export default InputErrorAttributes;
