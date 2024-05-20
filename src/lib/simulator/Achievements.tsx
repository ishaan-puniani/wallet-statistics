import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API_HOST } from "../../constants";
import { SimulatorWrapper } from "./Simulator";
export interface IAchievements {
  credentials?: any;
  achieverId?: any;
  action?: string;
  value?: number;
}

const Achievements = (props: IAchievements) => {
  const { register, handleSubmit,  } = useForm();

  const [view, setView] = useState(false);
  const [simualteRecord, setSimulateRecord] = useState<any>();
  const onSubmit = async (data: any) => {
    try {
      const simulateUserAchievement = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/simulate-user-achievements`,
        {
          data,
          ...props.credentials,
        }
      );
      setSimulateRecord(simulateUserAchievement.data);
      setView(true);
      console.log(simulateUserAchievement);
    } catch (err: any) {
      alert(err?.response?.data)
      console.log(err?.response?.data);
    }
  };



  return (
    <>
      <SimulatorWrapper>
        <h1>Achievement Stimulator</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!view && (
            <>
              <ul className="formStyle">
                <div className="achievement">
                  <li>
                    <label>Achiever Id :</label>
                    <input
                      value={props.achieverId}
                      {...register("achieverId")}
                    />
                  </li>
                  <li>
                    <label>Action : </label>
                    <input value={props.action} {...register("action")} />
                  </li>
                  <li>
                    <label>Value :</label>
                    <input value={props.value} {...register("value")} />
                  </li>
                </div>
              </ul>
            </>
          )}
          {view && (
            <div>
              <table>
                <tr>
                  <th>Identifier</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Reward Type </th>
                  <th>Transaction Type Identifier </th>
                </tr>
                {simualteRecord.map((transaction: any) => (
                  <tr>
                    <td>
                      <p>{transaction.achievementIdentifier}</p>
                    </td>
                    <td>
                      <p>{transaction.achievements?.transactionRewardDetail?.amount}</p>
                    </td>
                    <td>
                      <p>{transaction.achievements?.transactionRewardDetail?.currency}</p>
                    </td>
                    <td>
                      <p>{transaction.achievements?.transactionRewardDetail?.rewardType}</p>
                    </td>
                    <td>
                      <p>
                        {
                          transaction.achievements?.transactionRewardDetail?.transactionTypeIdentifier
                        }
                      </p>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          )}
         
          <div
            className=" formBtn"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "5px",
            }}
          >
            {!view && (
              <div className="formLayout">
                <button
                  className="submitBtn"
                  type="submit"
                >
                  Simulate
                </button>
              </div>
            )}
            {view && (
              <div className="formLayout">
                <button className="cancelBtn" onClick={() => setView(!view)}>
                  Change Stimulate
                </button>

                {/* TODO INTEGRATE */}
                
                {/* <button
                  className="submitBtn"
                  onClick={(values)=>console.log(values)}
                >
                  Commit Achievement
                </button> */}
              </div>
            )}
          </div>
        </form>
      </SimulatorWrapper>
    </>
  );
};
export default Achievements;
