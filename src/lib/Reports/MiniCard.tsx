/**
 * MiniCard
 *
 * Purpose:
 * Compact summary card showing an amount (or debit/credit) and percent change.
 * It fetches grouped balances via `_fetchGetBalances` and reads the appropriate
 * grouped fields depending on `volume` and `amountType` props.
 *
 * Props (common):
 * - `credentials`, `userId`, `currency`, `startDate`, `endDate`, `group`
 * - `transactionType`, `amountType`, `volume`, `includePrevious`, `includeToday`
 *
 * Integration:
 * Used by dashboard widgets; wrappers should forward credentials and date
 * range. Use `showRaw` to debug backend response shapes.
 */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { _fetchGetBalances } from "../services/balances";
import moment from "moment";
import Loader from "./Loader";
import { questionMark, upTrend, downTrend } from "../../svgs";
import { Group } from "./utils/utils";

export interface IMiniTransactionTypeCard {
  userId: string;
  currency: string;
  credentials: any;
  showRaw?: boolean;
  type?: "amount" | "debit" | "credit";
  label?: string;
  endDate: Date;
  startDate: Date;
  group: Group;
  includePrevious: boolean;
  includeToday: boolean;
  transactionType?: string;
  amountType?: "amount" | "virtual";
  showPrevious?: boolean;
  previousTitle?: string;
  questionMessage?: string;
  volume?: "total" | "group";
  isTransaction?: boolean;
}

const MiniCard = (props: IMiniTransactionTypeCard) => {
  const [amount, setAmount] = useState(0);
  const [preAmount, setPreAmount] = useState(0);
  const [transaction, setTransaction] = useState(0);
  const [previousTransaction, setPreviousTransaction] = useState(0);
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<Group>(
    (props.group as Group) || "monthly",
  );
  const transactionType = props.transactionType || "AMOUNT";
  const volume = props.volume || "group";
  const includeToday = props.includeToday || false;
  const label = props.label ?? "amount";

  const getAmountKey = (
    vol: "group" | "total" = volume,
    amountType: "amount" | "virtual" = props.amountType ?? "amount",
  ) => {
    const prefix = vol === "group" ? "grouped" : "total";
    const suffix = amountType === "virtual" ? "VirtualValues" : "Amounts";
    return `${prefix}${suffix}`;
  };

  const initialPeriod = props.startDate && props.endDate ? "custom" : "today";
  const [period, setPeriod] = useState<
    "today" | "yesterday" | "last_week" | "last_month" | "custom"
  >(initialPeriod as any);

  const [startDateLocal, setStartDateLocal] = useState<Date>(
    props.startDate ?? new Date(),
  );
  const [endDateLocal, setEndDateLocal] = useState<Date>(
    props.endDate ?? new Date(),
  );

  const applyPeriod = (p: string) => {
    let s = moment();
    let e = moment();
    switch (p) {
      case "today":
        s = moment();
        e = moment();
        break;
      case "yesterday":
        s = moment().subtract(1, "day");
        e = moment().subtract(1, "day");
        break;
      case "last_week":
        // previous calendar week (Monday - Sunday)
        s = moment().subtract(1, "week").startOf("isoWeek");
        e = moment().subtract(1, "week").endOf("isoWeek");
        break;
      case "last_month":
        // previous calendar month
        s = moment().subtract(1, "month").startOf("month");
        e = moment().subtract(1, "month").endOf("month");
        break;
    }

    setStartDateLocal(s.toDate());
    setEndDateLocal(e.toDate());
    setPeriod(p as any);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const balances = await _fetchGetBalances(
        props.credentials,
        props.userId,
        props.currency,
        moment(startDateLocal).format("YYYY-MM-DD"),
        moment(endDateLocal).format("YYYY-MM-DD"),
        group,
        props.includePrevious,
        includeToday,
      );
      if (balances.length === 2) {
        balances.forEach((balance: any) => {
          if (balance.date === moment(endDateLocal).format("YYYY-MM-DD")) {
            setTransaction(
              balance[
                volume === "group" ? "groupedTransactions" : "totalTransactions"
              ]?.[transactionType] ?? 0,
            );
            const key = getAmountKey(volume, props.amountType);
            const value = Math.abs(balance?.[key]?.[transactionType] ?? 0);
            setAmount(value);
          } else {
            setPreviousTransaction(
              balance[
                volume === "group" ? "groupedTransactions" : "totalTransactions"
              ]?.[transactionType] ?? 0,
            );
            const key = getAmountKey(volume, props.amountType);
            const preVal = Math.abs(balance?.[key]?.[transactionType] ?? 0);
            setPreAmount(preVal);
          }
        });
      } else if (balances.length === 1) {
        setTransaction(0);
        setPreviousTransaction(
          balances[0][
            volume === "group" ? "groupedTransactions" : "totalTransactions"
          ]?.[transactionType] ?? 0,
        );
        setAmount(0);
        const key = getAmountKey(volume, props.amountType);
        const preVal = Math.abs(balances[0]?.[key]?.[transactionType] ?? 0);
        setPreAmount(preVal);
      } else {
        setTransaction(0);
        setPreviousTransaction(0);
        setAmount(0);
        setPreAmount(0);
      }
      setLoading(false);
    };

    fetchData();
  }, [
    props.userId,
    props.currency,
    startDateLocal,
    endDateLocal,
    group,
    props.type,
    props.includePrevious,
    props.amountType,
  ]);

  const amountPercentChange =
    ((amount - preAmount) / (preAmount === 0 ? 1 : preAmount)) * 100;

  const transactionPercentChange =
    ((transaction - previousTransaction) /
      (previousTransaction === 0 ? 1 : previousTransaction)) *
    100;

  return (
    <Wrapper>
      <div style={{ marginBottom: 8 }}>
        <select
          placeholder="Select Time Range "
          value={period}
          style={{float:'right',marginBottom:'8px'}}
          onChange={(e) => applyPeriod(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last_week">Last Week</option>
          <option value="last_month">Last Month</option>
        </select>
      </div>
      <div className="transaction-type-card">
        <div className="heading">
          <div>{label}</div>
        </div>
        <div className="card-amount-container">
          <div className="amount">
            {loading ? (
              <Loader />
            ) : props.isTransaction ? (
              transaction
            ) : (
              Number(amount).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "INR",
              })
            )}
          </div>

          <div className="percent">
            {loading ? (
              <Loader />
            ) : (
              <>
                {!props.isTransaction &&
                  (amountPercentChange < 0 ? downTrend : upTrend)}
                {props.isTransaction &&
                  (transactionPercentChange < 0 ? downTrend : upTrend)}
                <p>
                  {props.isTransaction
                    ? transactionPercentChange.toFixed(2)
                    : amountPercentChange.toFixed(2)}
                  %
                </p>
              </>
            )}
          </div>
        </div>
        {props.showPrevious ? (
          <>
            <hr />
            <div className="previous">
              <div className="previous__amount">
                {loading ? (
                  <Loader />
                ) : props.isTransaction ? (
                  previousTransaction
                ) : (
                  Number(preAmount).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                    style: "currency",
                    currency: props.currency ?? "INR",
                  }) ?? 0
                )}
              </div>
              <div className="previous__title">
                <span className="previous__title__text">
                  {props.previousTitle ?? group}
                </span>
                <span
                  className="previous__title__question"
                  title={props.questionMessage ?? group}
                >
                  {questionMark}
                </span>
              </div>
            </div>
          </>
        ) : null}
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

export default MiniCard;
