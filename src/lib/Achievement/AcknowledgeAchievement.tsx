import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_HOST } from "../../constants";
import { SimulatorWrapper } from "../simulator/Simulator";
export interface IAcknowledgeAchievement {
  credentials?: any;
  achieverId?: string;
  achievementId: string;
}

const AcknowledgeAchievement = (props: IAcknowledgeAchievement) => {
  const { register, handleSubmit } = useForm();

  const [achievement, setAchievement] = useState([]);
  const [responseRecord, setResponseRecord] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const fetchBalance = await axios.post(
        // `${API_HOST}/tenant/${props.credentials.application_id}/get-current-balances-for-transaction-types?filter[userId]=${props.userId}&filter[currency]=${props.currency}`,
        `${props.credentials.host || API_HOST}/tenant/${props.credentials.application_id}/get-achievement?limit=100&offset=0`,
        {
          ...props.credentials,
        }
      );
      if (fetchBalance.data) {
        const items = fetchBalance.data.rows;
        setAchievement(items);
        console.log(items);
      }
      // setLoading(false);
    };
    fetchData();
  }, []);
  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        `${props.credentials.host || API_HOST}/tenant/${props.credentials.application_id}/user-achievements/acknowledge/${props.achieverId}/${props.achievementId}`,
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
        <h1>Acknowledge Achievement</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="formStyle">
            <div className="achievement">
              <li>
                <label>Achievement :</label>
                <select {...register("achievementId")}>
                  <option>Select Achievement</option>

                  {achievement?.length > 0 &&
                    achievement.map((cur: any) => (
                      <option key={cur.id} value={cur.identifier}>
                        {cur.identifier}
                      </option>
                    ))}
                </select>
              </li>
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
    </>
  );
};
export default AcknowledgeAchievement;
