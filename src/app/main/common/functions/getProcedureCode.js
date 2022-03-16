export const getProcedureCode = (procedure) => {
  return procedure?.split("(").pop().split(")")[0];
};
