import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_HOST } from "../../constants";
import { SimulatorWrapper } from "../simulator/Simulator";
import styled from "styled-components";
export interface ICouponValidation {
  credentials?: any;
  partnerId: string;
  amount: string;
  couponCode: string;
}

const CouponValidation = (props: ICouponValidation) => {
  const { register, handleSubmit } = useForm();

  const [response, setResponse] = useState<any>();

  const onSubmit = async (data: any) => {
    const validate = await axios.post(
      `${API_HOST}/tenant/${props.credentials.application_id}/validate-coupon`,
      {
        data,
      }
    );
    if (validate) {
      setResponse(validate.data);
    }
  };

  return (
    <SimulatorWrapper>
      <Wrapper>
        <h1>Coupon Validation</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="formStyle achievement">
            <li>
              <label>Coupon Code :</label>
              <input value={props.couponCode} {...register("couponCode")} />
            </li>
            <li>
              <label>Amount :</label>
              <input value={props.amount} {...register("amount")} />
            </li>

            <li>
              <label>Partner Id :</label>
              <input value={props.partnerId} {...register("partnerId")} />
            </li>
          </ul>
          <div className="formStyle formStyle-btn">
            <input type="submit" />
          </div>
        </form>
        <p id="validCoupon">
          Valid Coupon- {JSON.stringify(response?.isvalid)}
        </p>
        <p id="couponDiscount">
          Coupon Discount - {JSON.stringify(response, null, 4)}
        </p>
      </Wrapper>
    </SimulatorWrapper>
  );
};
export default CouponValidation;
const Wrapper = styled.div`
  p {
    margin-left: 45px;
  }
  .formStyle li {
    justify-content: space-between;
  }
  .formStyle li select {
    width: 337px;
    height: 24px;
  }
  .formStyle li input[type="date"] {
    width: 334px;
    height: 24px;
    padding: 0px;
  }
`;
