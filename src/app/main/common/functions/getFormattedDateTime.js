import moment from "moment";

export const getFormattedDateTime = ({ date, format }) => {
  return moment(moment.utc(date).toDate()).local().format(format);
};
