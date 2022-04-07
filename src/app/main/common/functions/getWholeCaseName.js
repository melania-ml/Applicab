import { getProcedureCode } from "./getProcedureCode";
import { getFormattedDateTime } from "./getFormattedDateTime";

export const getWholeCaseName = (
  caseName,
  procedureType,
  createdDate,
  uniqueCode
) => {
  return `${caseName} - ${getProcedureCode(
    procedureType
  )} - ${getFormattedDateTime({
    date: createdDate,
    format: "DD/MM/YYYY"
  })} - ${uniqueCode}`;
};
