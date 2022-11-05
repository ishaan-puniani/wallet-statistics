import React from "react";
import { useForm } from "react-hook-form";
import { saveMachineUserCredentials } from "../utilities/storage";

const MachineUserCredentials = (props: any) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    saveMachineUserCredentials(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        Application Id: <input {...register("application_id")} />
      </div>
      <div>
        Client Id: <input {...register("client_id")} />
      </div>
      <div>
        Client Secret: <input {...register("client_secret")} />
      </div>
      <div>
        version:
        <select {...register("version")}>
          <option value=""></option>
          <option value="storybook_">storybook_</option>
          <option value="v1_">v1_</option>
        </select>
      </div>
      <input type="submit" />
    </form>
  );
};

export default MachineUserCredentials;
