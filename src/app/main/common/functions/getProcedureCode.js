export const getProcedureCode = (procedure) => {
  if (procedure?.split("(").pop().split(")")[0] === "divorce hors DCM") {
    return procedure?.split("(")[2].split(")")[0];
  }
  return procedure?.split("(").pop().split(")")[0];
};
