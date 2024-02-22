import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { _fetchGetBalances } from "../services/balances";
import moment from "moment";
import Loader from "./Loader";

export interface IMiniTransactionTypeCard {
  userId: string;
  currency: string;
  credentials: any;
  showRaw?: boolean;
  cardConfig?: any;
  endDate: Date;
  startDate: Date;
  group: string;
  includePrevious: boolean;
  transactionType?: string;
  amountType?: "amount" | "virtual";
}

const MiniTransactionTypeCard = (props: IMiniTransactionTypeCard) => {
  const [amount, setAmount] = useState(0);
  const [preAmount, setPreAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const transactionType = props.transactionType || "AMOUNT";
  const group = props.group || "monthly";
  const cardConfig = Object.keys(props.cardConfig).length
    ? props.cardConfig
    : { label: "Credit", type: "credit" };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const balances = await _fetchGetBalances(
        props.credentials,
        props.userId,
        props.currency,
        moment(props.startDate).format("YYYY-MM-DD"),
        moment(props.endDate).format("YYYY-MM-DD"),
        group,
        props.includePrevious
      );
      if (balances.length === 2) {
        balances.forEach((balance: any) => {
          if (balance.date === moment(props.endDate).format("YYYY-MM-DD")) {
            if (cardConfig.type === "amount") {
              props.amountType === "virtual"
                ? setAmount(
                    Math.abs(balance.dailyVirtualValues?.[transactionType]) || 0
                  )
                : setAmount(
                    Math.abs(balance.dailyAmounts?.[transactionType]) || 0
                  );
            } else if (cardConfig.type === "credit") {
              props.amountType === "virtual"
                ? setAmount(
                    Math.abs(
                      balance.dailyCrediVirtualValues?.[transactionType]
                    ) || 0
                  )
                : setAmount(
                    Math.abs(balance.dailyCreditAmounts?.[transactionType]) || 0
                  );
            } else if (cardConfig.type === "debit") {
              props.amountType === "virtual"
                ? setAmount(
                    Math.abs(
                      balance.dailyDebitVirtualValues?.[transactionType]
                    ) || 0
                  )
                : setAmount(
                    Math.abs(balance.dailyDebitAmounts?.[transactionType]) || 0
                  );
            }
          } else {
            if (cardConfig.type === "amount") {
              props.amountType === "virtual"
                ? setPreAmount(
                    Math.abs(balance.dailyVirtualValues?.[transactionType]) || 0
                  )
                : setPreAmount(
                    Math.abs(balance.dailyAmounts?.[transactionType]) || 0
                  );
            } else if (cardConfig.type === "credit") {
              props.amountType === "virtual"
                ? setPreAmount(
                    Math.abs(
                      balance.dailyCrediVirtualValues?.[transactionType]
                    ) || 0
                  )
                : setPreAmount(
                    Math.abs(balance.dailyCreditAmounts?.[transactionType]) || 0
                  );
            } else if (cardConfig.type === "debit") {
              props.amountType === "virtual"
                ? setPreAmount(
                    Math.abs(
                      balance.dailyDebitVirtualValues?.[transactionType]
                    ) || 0
                  )
                : setPreAmount(
                    Math.abs(balance.dailyDebitAmounts?.[transactionType]) || 0
                  );
            }
          }
        });
      } else if (balances.length === 1) {
        setAmount(0);
        if (cardConfig.type === "amount") {
          props.amountType === "virtual"
            ? setPreAmount(
                Math.abs(balances[0]?.dailyVirtualValues?.[transactionType]) ||
                  0
              )
            : setPreAmount(
                Math.abs(balances[0]?.dailyAmounts?.[transactionType]) || 0
              );
        } else if (cardConfig.type === "credit") {
          props.amountType === "virtual"
            ? setPreAmount(
                Math.abs(
                  balances[0]?.dailyCrediVirtualValues?.[transactionType]
                ) || 0
              )
            : setPreAmount(
                Math.abs(balances[0]?.dailyCreditAmounts?.[transactionType]) ||
                  0
              );
        } else if (cardConfig.type === "debit") {
          props.amountType === "virtual"
            ? setPreAmount(
                Math.abs(
                  balances[0]?.dailyDebitVirtualValues?.[transactionType]
                ) || 0
              )
            : setPreAmount(
                Math.abs(balances[0]?.dailyDebitAmounts?.[transactionType]) || 0
              );
        }
      } else {
        setAmount(0);
        setPreAmount(0);
      }
      setLoading(false);
    };

    fetchData();
  }, [
    props.userId,
    props.currency,
    props.startDate,
    props.endDate,
    props.group,
    props.cardConfig,
    props.includePrevious,
    props.amountType,
  ]);

  const amountPercentChange =
    ((amount - preAmount) / (preAmount === 0 ? 1 : preAmount)) * 100 ?? 0;
  return (
    <Wrapper>
      <div className="transaction-type-card">
        <h2>{cardConfig.label}</h2>
        <div className="card-amount-container">
          <div>
            <h3>
              {loading ? (
                <Loader />
              ) : (
                Number(amount).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "INR",
                })
              )}
            </h3>
          </div>
          <div className="percent">
            {loading ? (
              <Loader />
            ) : (
              <>
                {amountPercentChange < 0 ? (
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium trending-icon css-vubbuv"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="TrendingUpOutlinedIcon"
                    style={{
                      fill: "rgb(255, 0, 0)",
                      transform: "rotate(180deg)",
                      width: "16px",
                    }}
                  >
                    <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"></path>
                  </svg>
                ) : (
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium trending-icon css-vubbuv"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="TrendingUpOutlinedIcon"
                    style={{
                      fill: "rgb(7, 128, 243)",
                      width: "16px",
                    }}
                  >
                    <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"></path>
                  </svg>
                )}
                <p>{amountPercentChange.toFixed(2)}%</p>
              </>
            )}
          </div>
        </div>
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
`;

export default MiniTransactionTypeCard;
