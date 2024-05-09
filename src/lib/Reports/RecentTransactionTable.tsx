import { useEffect, useState } from "react";
import { _fetchReportTransactions } from "../services/balances";
import styled from "styled-components";
import moment from "moment";
import Loader from "./Loader";

export interface IRecentTransactionTable {
  userId: string;
  currency: string;
  credentials: any;
  showRaw: boolean;
  filterMap: any;
  endDate: Date;
  startDate: Date;
  limit: string;
  routePage?: any;
  handleTransactionTypeDetails?: any;
}

const RecentTransactionTable = (props: IRecentTransactionTable) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      try {
        const balances = await _fetchReportTransactions(
          props.credentials,
          props.filterMap ?? {
            Currency: props.currency,
            PartnerId: props.userId,
          },
          undefined,
          undefined,
          undefined,
          props.limit
        );
        setRows(balances.rows);
      } catch (e: any) {
        console.log("Error", e);
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  }, [props.userId, props.startDate, props.endDate, props.currency]);

  return (
    <Wrapper>
      <div style={{ overflowX: "auto" }}>
        <table className="table">
          <tr className="table-heading">
            <th>Created At</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>IsCredit</th>
            <th>Transaction type</th>
            <th>Reference</th>
          </tr>

          {loading && (
            <div className="loader">
              {" "}
              <Loader />
            </div>
          )}

          {!loading && rows.length === 0 ? (
            <div className="no-data">No data</div>
          ) : null}

          {rows.map((row) => {
            return (
              <tr className="table-data">
                <td>{moment(row?.createdAt).format("DD-MM-YYYY HH:MM")}</td>
                <td
                  className={row?.IsCredit > 0 ? "amount-plus" : "amount-minus"}
                >
                  {row?.IsCredit > 0 ? `+ ${row?.amount}` : `- ${row?.amount}`}
                </td>
                <td>{row?.currency}</td>
                <td>{row?.IsCredit ? "Yes" : "No"}</td>
                <td
                  className="table-data__transactionType"
                  onClick={() =>
                    props.handleTransactionTypeDetails
                      ? props.handleTransactionTypeDetails(
                          row?.transactionTypeDetail?.id
                        )
                      : null
                  }
                >
                  {row?.transactionTypeDetail?.name}
                </td>
                <td>{row?.reference}</td>
              </tr>
            );
          })}
        </table>
      </div>
      {rows.length ? (
        <div className="footer">
          <div
            className="footer__view-all"
            onClick={() => (props.routePage ? props.routePage() : null)}
          >
            View all transactions
          </div>
        </div>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th,
  td {
    text-align: left;
    padding: 15px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  .amount-plus {
    color: green;
  }
  .amount-minus {
    color: red;
  }
  .table__row {
    padding: 12px;
  }
  .no-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .footer {
    margin: 5px 16px 5px 0px;
    display: flex;
    justify-content: end;
    color: #1677ff;
    &__view-all {
      cursor: pointer;
    }
    &__view-all:hover {
      opacity: 0.6;
    }
  }
  .table-data {
    &__transactionType {
      color: #1677ff;
      cursor: pointer;
    }
    &__transactionType:hover {
      opacity: 0.6;
    }
  }
  .table-data:hover {
    background-color: #efefef;
  }
`;

export default RecentTransactionTable;
