import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { API_HOST } from "../../constants";
import "./stimulator.css";
export interface IAchievements {
  credentials?: any;
  achieverId?: any;
  action?: string;
  value?: number;
}

const Achievements = (props: IAchievements) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    const simulateUserAchievement = await axios.post(
      `${API_HOST}/tenant/${props.credentials.application_id}/sim-user-achievements`,
      {
        data,
      }
    );
  };

  return (
    <>
      <h1>Achievement Stimulator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="formStyle">
          <div>
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
        <div className="formStyle">
          <input type="submit" />
        </div>
      </form>
    </>
  );
};
export default Achievements;
