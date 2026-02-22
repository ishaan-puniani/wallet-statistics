/**
 * PartnersCount
 *
 * Purpose:
 * Small summary card component that shows partner counts and percent
 * changes. It queries `_fetchReportPartnersCount` and offers options to
 * display total, grouped, or per-type counts.
 *
 * Props (common):
 * - `credentials`, `startDate`, `endDate`, `group` and configuration flags
 * - `transactionCountType` to select which field to read from the response
 *
 * Integration:
 * Use this component inside widgets; wrapper code in `fe-wallet-and-bonus`
 * should pass `credentials` and the desired grouping/date-range.
 */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { _fetchReportPartnersCount } from "../services/balances";
import moment from "moment";
import Loader from "./Loader";
import { questionMark, upTrend, downTrend } from "../../svgs";
import clsx from "clsx";
import { Group } from "./utils/utils";
import PeriodToogle from "./utils/PeriodToogle";

export interface IPartnersCount {
  userId: string;
  credentials: any;
  showRaw?: boolean;
  label?: string;
  endDate: Date;
  startDate: Date;
  group: Group;
  supportedGrouping?: Group[];
  transactionCountType: any;
  totalCount?: boolean;
  transactionType?: string;
  showPrevious?: boolean;
  previousTitle?: string;
  questionMessage?: string;
}

const type = {
  groupedPeriod: "countGroupedPeriod",
  groupedPeriodAndType: "countGroupedPeriodAndType",
  perType: "countPerType",
};

const PartnersCount = (props: IPartnersCount) => {
  const getTypeValue = (key: keyof typeof type) => {
    return type[key];
  };
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState<any>();
  const [percentChange, setPercentChange] = useState(0);
  const transactionCountType = getTypeValue(
    props.transactionCountType ?? type.groupedPeriod,
  );
  const [group, setGroup] = useState((props.group as Group) || "monthly");
  const supportedGrouping = props.supportedGrouping ?? ["monthly"];
  const {
    totalCount,
    label,
    showPrevious,
    previousTitle,
    questionMessage,
    startDate,
  } = props;

  useEffect(() => {
    const fetchData = async () => {
      const transactionsCount = await _fetchReportPartnersCount(
        props.credentials,
        group,
      );
      setCount(transactionsCount);
      setLoading(false);
    };

    fetchData();
  }, [props.credentials, group]);

  const formatDate = (date: moment.Moment, period: string) => {
    switch (period) {
      case "monthly":
        return date.endOf("month").format("YYYY-MM-DD");
      case "daily":
        return date.format("YYYY-MM-DD");
      case "weekly":
        return date.endOf("week").format("YYYY-MM-DD");
      case "quarterly":
        return date.endOf("quarter").format("YYYY-MM-DD");
      case "yearly":
        return date.endOf("year").format("YYYY-MM-DD");
      default:
        return date.format("YYYY-MM-DD");
    }
  };

  const grouped = (group: string) => {
    switch (group) {
      case "monthly":
        return "month";
      case "daily":
        return "day";
      case "weekly":
        return "week";
      case "quarterly":
        return "quarter";
      case "yearly":
        return "year";
    }
  };

  const getTransactionCount = (date?: moment.Moment, offset = 0) => {
    if (transactionCountType === type.perType) {
      return count?.[transactionCountType]?.[props?.transactionType] ?? 0;
    }
    const periodDate = offset
      ? formatDate(date.subtract(offset, grouped(group)), group)
      : formatDate(date, group);
    if (transactionCountType === type.groupedPeriodAndType) {
      return (
        count?.[transactionCountType]?.[periodDate]?.[props?.transactionType] ??
        0
      );
    } else if (transactionCountType === type.groupedPeriod) {
      return count?.[transactionCountType]?.[periodDate] ?? 0;
    }
  };

  useEffect(() => {
    if (totalCount || transactionCountType === type.perType) {
      return;
    }
    const currentCount = getTransactionCount(moment(startDate));
    const previousCount = getTransactionCount(moment(startDate), 1);
    const percent =
      ((currentCount - previousCount) / (previousCount || 1)) * 100;
    setPercentChange(percent);
  }, [count, startDate, group]);

  if (totalCount) {
    return (
      <Wrapper>
        {" "}
        <div className="total-count">
          <div>{label ?? "Total Partners"}</div>
          <div>{loading ? <Loader /> : count?.totalCount}</div>
        </div>
      </Wrapper>
    );
  }
  const handleGroupChange = (g: Group) => {
    setGroup(g);
  };

  return (
    <Wrapper>
      <PeriodToogle
        group={group}
        groupHandler={handleGroupChange}
        supportedGrouping={supportedGrouping}
      />
      <div className="transaction-type-card">
        <div className="heading">
          <div>{label ?? "Partners"}</div>
        </div>
        <div
          className={clsx({
            "card-amount-container": true,
            "per-transaction-type":
              showPrevious || transactionCountType === type.perType,
          })}
        >
          <div
            className={clsx({
              amount: true,
              "not-previous-amount":
                showPrevious || transactionCountType !== type.perType,
            })}
          >
            {transactionCountType === type.perType
              ? getTransactionCount()
              : getTransactionCount(moment(startDate))}
          </div>
          {transactionCountType !== type.perType && (
            <div className="percent">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {percentChange < 0 ? downTrend : upTrend}
                  <p>{Math.abs(percentChange).toFixed(2)}%</p>
                </>
              )}
            </div>
          )}
        </div>
        {showPrevious && transactionCountType !== type.perType && (
          <>
            <hr />
            <div className="previous">
              <div className="previous__amount">
                {loading ? (
                  <Loader />
                ) : (
                  getTransactionCount(moment(startDate), 1)
                )}
              </div>
              <div className="previous__title">
                <span className="previous__title__text">
                  {previousTitle ?? group}
                </span>
                <span
                  className="previous__title__question"
                  title={questionMessage ?? group}
                >
                  {questionMark}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .transaction-type-card {
    padding: 0 12px;
    h2 {
      margin: 0;
      margin-bottom: 6px;
    }
  }
  .card-amount-container {
    display: flex;
    justify-content: space-between;
    h3 {
      margin: 0;
    }
    .percent {
      display: flex;
      gap: 4px;
      p {
        margin: 0;
      }
    }
  }
  .amount {
    font-weight: 600;
  }
  .heading {
    display: flex;
    justify-content: center;
    font-weight: 600;
    text-transform: capitalize;
  }
  .previous {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    &__title {
      &__text {
        text-transform: capitalize;
      }
      &__question {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

export default PartnersCount;
