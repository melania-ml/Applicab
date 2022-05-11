export const checkIsNumber = (value) => {
  if (value) {
    const regex = new RegExp('^[0-9]*$');
    return regex.test(value);
  }
  return false;
};
