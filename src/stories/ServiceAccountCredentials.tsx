import React from "react";
import { useForm } from "react-hook-form";
import { saveServiceAccountCredentials } from "../utilities/storage";
import { _initialize } from "../lib/services/settings";

const ServiceAccountCredentials = ({ credentials }: any) => {
  const { register, handleSubmit } = useForm({
    defaultValues: credentials,
  });
  const onSubmit = async (data) => {
    saveServiceAccountCredentials(data);
    await _initialize(data);
  };

  return (
    <>
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
      <hr />
      <div>Note : After Submitting, please do a Reload</div>
    </>
  );
};

export default ServiceAccountCredentials;
