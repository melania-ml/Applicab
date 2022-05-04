export const getNumericValidation = (e) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
