import axios from "axios";
import React from "react";
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
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    try {
      const simulateUserAchievement = await axios.post(
        `${API_HOST}/tenant/${props.credentials.application_id}/simulate-user-achievements`,
        {
          data,
        }
      );
      console.log(simulateUserAchievement);
    } catch (err: any) {
      console.log(err?.response?.data);
    }
  };

  return (
    <>
      <SimulatorWrapper>
        <h1>Achievement Stimulator</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="formStyle">
            <div className="achievement">
              <li>
                <label>Achiever Id :</label>
                <input value={props.achieverId} {...register("achieverId")} />
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
          <div className="formStyle formStyle-btn">
            <input type="submit" />
          </div>
        </form>
      </SimulatorWrapper>
    </>
  );
};
export default Achievements;
