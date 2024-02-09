import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { _fetchGetBalances } from "../services/balances";
import moment from "moment";

export interface IMiniTransactionTypeCard {
  userId: string;
  currency: string;
  credentials: any;
  showRaw?: boolean;
  cardConfig: any;
  endDate: Date;
  startDate: Date;
  group: string;
  includePrevious: boolean;
}

const MiniTransactionTypeCard = (props: IMiniTransactionTypeCard) => {
  const [amount, setAmount] = useState(0);
  const [preAmount, setPreAmount] = useState(0);
  console.log(props.cardConfig);
  useEffect(() => {
    // const cardConfig = {
    //   // needs to be prop based
    //   label: "Balance",
    //   type: "debit",
    // };
    const fetchData = async () => {
      const balances = await _fetchGetBalances(
        props.credentials,
        props.userId,
        props.currency,
        moment(props.startDate).format("YYYY-MM-DD"),
        moment(props.endDate).format("YYYY-MM-DD"),
        props.group,
        props.includePrevious
      );
      console.log("dpk", balances);

      if (balances.length === 2) {
        balances.forEach((i: any) => {
          if (i.date === moment(props.endDate).format("YYYY-MM-DD")) {
            if (props.cardConfig.type === "amount") {
              setAmount(Math.abs(i.dailyAmounts?.AMOUNT) || 0);
            } else if (props.cardConfig.type === "credit") {
              setAmount(Math.abs(i.dailyCreditAmounts?.AMOUNT) || 0);
            } else if (props.cardConfig.type === "debit") {
              setAmount(Math.abs(i.dailyDebitAmounts?.AMOUNT) || 0);
            }
          } else {
            if (props.cardConfig.type === "amount") {
              setPreAmount(Math.abs(i.dailyAmounts?.AMOUNT) || 0);
            } else if (props.cardConfig.type === "credit") {
              setPreAmount(Math.abs(i.dailyCreditAmounts?.AMOUNT) || 0);
            } else if (props.cardConfig.type === "debit") {
              setPreAmount(Math.abs(i.dailyDebitAmounts?.AMOUNT) || 0);
            }
          }
        });
      } else if (balances.length === 1) {
        setAmount(0);
        if (props.cardConfig.type === "amount") {
          setPreAmount(Math.abs(balances[0]?.dailyAmounts?.AMOUNT) || 0);
        } else if (props.cardConfig.type === "credit") {
          setPreAmount(Math.abs(balances[0]?.dailyCreditAmounts?.AMOUNT) || 0);
        } else if (props.cardConfig.type === "debit") {
          setPreAmount(Math.abs(balances[0]?.dailyDebitAmounts?.AMOUNT) || 0);
        }
      } else {
        setAmount(0);
        setPreAmount(0);
      }
    };

    fetchData();
  }, [
    props.userId,
    props.currency,
    props.startDate,
    props.endDate,
    props.group,
    props.cardConfig,
  ]);

  const amountPercentChange =
    ((amount - preAmount) / (preAmount === 0 ? 1 : preAmount)) * 100 ?? 0;
  return (
    <Wrapper>
      <div>
        <h2>{props.cardConfig.label}</h2>
        <div className="card-amount-container">
          <div>
            <h3>₹{amount}</h3>
          </div>
          <div className="percent">
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
                  //   transform: "rotate(180deg)",
                  width: "16px",
                }}
              >
                <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"></path>
              </svg>
            )}

            <p>{amountPercentChange.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
