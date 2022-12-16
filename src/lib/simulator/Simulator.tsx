import React from "react";
import { useForm } from "react-hook-form";

export interface ISimulatorProps {
  text?: string;
}

const Simulator = (props: ISimulatorProps) => {
  console.log("REACHED");

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <h1>{props.text}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Transaction Type:</label>{" "}
          <input {...register("transactionType")} />
        </div>
        <div>
          <label>Amount : </label>
          <input {...register("amount")} />
        </div>
        <div>
          <label>Currency :</label>
          <input {...register("currency")} />
        </div>
        <div>
          <label>Virtual Value :</label>
          <input {...register("virtual_Value")} />
        </div>
        <div>
          <label>Is Credit :</label>
          <input {...register("isCredit")} />
        </div>{" "}
        <div>
          <label>Reference :</label>
          <input {...register("reference")} />
        </div>
        <div>
          <label>Payment Method :</label>
          <input {...register("paymentMethod")} />
        </div>{" "}
        <div>
          <label>Remark:</label>
          <input {...register("remark")} />
        </div>{" "}
        <div>
          <label>Description :</label>
          <input {...register("description")} />
        </div>{" "}
        <div>
          <label>Product Id :</label>
          <input {...register("productId")} />
        </div>{" "}
        <div>
          <label>Product Name :</label>
          <input {...register("productName")} />
        </div>{" "}
        <div>
          <label>SKU :</label>
          <input {...register("sku")} />
        </div>{" "}
        <div>
          <label>Payer Id :</label>
          <input {...register("payerId")} />
        </div>{" "}
        <div>
          <label>Payer Name :</label>
          <input {...register("payerName")} />
        </div>{" "}
        <div>
          <label>Payee Id :</label>
          <input {...register("payeeId")} />
        </div>{" "}
        <div>
          <label>payeeName :</label>
          <input {...register("payeeName")} />
        </div>{" "}
        <div>
          <label>On Behalf Of Id :</label>
          <input {...register("onBehalfOfId")} />
        </div>{" "}
        <div>
          <label>onBehalfOfName :</label>
          <input {...register("onBehalfOfName")} />
        </div>{" "}
        <div>
          <label>Additional Data :</label>
          <input {...register("additionalData")} />
        </div>{" "}
        <div>
          <label>Base Transaction :</label>
          <input {...register("baseTransaction")} />
        </div>
        <input type="submit" />
      </form>
    </>
  );
};
export default Simulator;
