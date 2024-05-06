import Qs from "qs";
import moment from "moment";

export const getFilterMapFromArray = (filters: any) => {
  return filters.reduce((acc: any, itm: any) => {
    acc[itm.id] = itm.value;
    return acc;
  }, {});
};

export const getFilterQueryString = (filters: any) => {
  return Qs.stringify(filters, {
    arrayFormat: "brackets",
    filter: (prefix, value) => {
      if (moment.isMoment(value) || value instanceof Date) {
        return value.toISOString();
      }
      return value;
    },
  });
};
