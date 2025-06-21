import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API_HOST } from "../../constants";
import { SimulatorWrapper } from "../simulator/Simulator";
import { ViewsWrapper } from "./UserAchievements";
export interface IUnacknowledgedAchievement {
  credentials?: any;
  achieverId?: string;
}

const UnacknowledgedAchievement = (props: IUnacknowledgedAchievement) => {
  const { register, handleSubmit } = useForm();

  const [responseRecord, setResponseRecord] = useState<any>();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        `${props.credentials.host || API_HOST}/tenant/${props.credentials.application_id}/user-achievements/get-unacknowledged/${props.achieverId}`,
        {
          data,
        }
      );
      if (response.status === 200) {
        setResponseRecord(response.data);
      }
    } catch (err: any) {
      console.log(err?.response?.data);
    }
  };

  return (
    <>
      <SimulatorWrapper>
        <h1>Unacknowledged Achievement</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="formStyle">
            <div className="achievement">
              <li>
                <label>Achiever Id :</label>
                <input value={props.achieverId} {...register("achieverId")} />
              </li>
            </div>
          </ul>
          <div className="formStyle formStyle-btn">
            <input type="submit" />
          </div>
        </form>
      </SimulatorWrapper>
      <ViewsWrapper>
        <div className="container-of-user-achievement">
          {responseRecord?.map((rec:any) => (
            <>
              <div className="container">
                <div className="image-container">
                  {/* <img src={rec?.iconLink} alt="icon" /> */}
                  <img
                    src={
                      rec?.iconLink !== null
                        ? "https://i.ibb.co/PYv269v/6839254.png"
                        : rec?.iconLink
                    }
                    style={{ width: "44px" }}
                    alt="icon"
                  />
                </div>
                <div className="text-container">
                  <div className="level-and-title-container">
                    <div className="title-and-subTitle-container">
                      <h2 className="available-achievement-title">
                        {rec?.achievement?.title}
                      </h2>
                      {rec?.achievement?.subTitle && (
                        <>
                          <h4 className="user-achievement-subtitle">
                            {rec?.achievement?.subTitle}
                          </h4>
                        </>
                      )}
                    </div>
                    {rec?.levelOrderNumber !== null && (
                      <>
                        <h4 className="user-achievement-level">
                          <span>Level: </span>
                          <span>{rec?.levelOrderNumber}</span>
                        </h4>
                      </>
                    )}
                  </div>
                  {/* <h3 className="available-achievement-identifier">
                    {rec?.identifier.replace(/[_]/gi, " ")}
                  </h3> */}

                  <p className="available-achievement-2col">
                    <strong>Identifier</strong>
                    <span>: {rec?.achievement?.identifier}</span>
                  </p>
                  <p className="available-achievement-2col">
                    <strong>Progress</strong>
                    <span>: {rec?.progress !== null ? rec?.progress : 0}</span>
                  </p>
                  <p className="available-achievement-2col">
                    <strong>Progress Pct</strong>
                    <span>
                      : {rec?.progressPct !== null ? rec?.progressPct : 0}
                    </span>
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </ViewsWrapper>
    </>
  );
};
export default UnacknowledgedAchievement;
