import moment from "moment";

export const makeXAxisData = (
  countGroupedPeriodAndType: string[],
  group: string,
  startDate: any,
  endDate: any
) => {
  if (!countGroupedPeriodAndType?.length) {
    return;
  }
  const dates = countGroupedPeriodAndType;
  const xData = dates?.filter((date) => {
    return checkRange(
      moment(date).format("YYYY-MM-DD"),
      group,
      startDate,
      endDate
    );
  });
  return sortXData(xData) ?? [];
};

export const checkRange = (
  date: any,
  group: string,
  startDate: any,
  endDate: any
) => {
  if (group === "yearly") {
    const sDate = moment(startDate)
      .endOf("year")
      .endOf("month")
      .format("YYYY-MM-DD");
    const eDate = moment(endDate)
      .endOf("year")
      .endOf("month")
      .format("YYYY-MM-DD");
    return moment(date) >= moment(sDate) && moment(date) <= moment(eDate);
  } else if (group === "quarterly") {
    const sDate = moment(startDate)
      .endOf("quarter")
      .endOf("month")
      .format("YYYY-MM-DD");
    const eDate = moment(endDate)
      .endOf("quarter")
      .endOf("month")
      .format("YYYY-MM-DD");
    return moment(date) >= moment(sDate) && moment(date) <= moment(eDate);
  } else if (group === "monthly") {
    const sDate = moment(startDate)
      .startOf("month")
      .format("YYYY-MM-DD");
    const eDate = moment(endDate)
      .endOf("month")
      .format("YYYY-MM-DD");
    return moment(date) >= moment(sDate) && moment(date) <= moment(eDate);
  }
  return moment(date) >= moment(startDate) && moment(date) <= moment(endDate);
};

export const sortXData = (xData: string[]) => {
  return xData?.sort(function (a, b) {
    const keyA = new Date(a);
    const keyB = new Date(b);
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
};

export const balanceKeyMap: Record<
  string,
  Record<string, Record<string, string>>
> = {
  debit: {
    virtual: {
      group: "groupedDebitVirtualValues",
      total: "totalDebitVirtualValues",
    },
    real: {
      group: "groupedDebitAmounts",
      total: "totalDebitAmounts",
    },
  },
  credit: {
    virtual: {
      group: "groupedCrediVirtualValues",
      total: "totalCrediVirtualValues",
    },
    real: {
      group: "groupedCreditAmounts",
      total: "totalCreditAmounts",
    },
  },
  amount: {
    virtual: {
      group: "groupedVirtualValues",
      total: "totalVirtualValues",
    },
    real: {
      group: "groupedAmounts",
      total: "totalAmounts",
    },
  },
};
export type Group =
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "yearly";