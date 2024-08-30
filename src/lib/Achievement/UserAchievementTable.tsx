import React, { useEffect, useState } from "react";
import { _userAchivements } from "../services/userAchievement";
import styled from "styled-components";
import moment from "moment";
import Loader from "../Reports/Loader";

export interface IUserAchievementTable {
  credentials: {
    application_id: string;
    __token: string;
  };
  showRaw: boolean;
  filterMap: any;
  limit: string;
  offset: string;
  routePage?: () => void;
}

const UserAchievementTable = (props: IUserAchievementTable) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      try {
        const balances = await _userAchivements(
          props.credentials,
          props.filterMap,
          props.limit,
          props.offset
        );
        setRows(balances.rows);
      } catch (e: any) {
        console.log("Error", e);
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  }, []);

  return (
    <Wrapper>
      <div style={{ overflowX: "auto" }}>
        <table className="table">
          <tr className="table-heading">
            <th>Created At</th>
            <th>Achievement Identifier</th>
            <th>Achiever Id</th>
            <th>Is Acknowledged</th>
            <th>Acknowledged At</th>
            <th>Progress</th>
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
                <td>{row?.achievementIdentifier ?? "NA"}</td>
                <td>{row?.achieverId ?? "NA"}</td>
                <td>{row?.isAcknowledged ? "Yes" : "No"}</td>
                <td>{row?.acknowledgedAt ?? "NA"}</td>
                <td>{row?.progress ?? "NA"}</td>
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
            View all achievements
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

export default UserAchievementTable;
