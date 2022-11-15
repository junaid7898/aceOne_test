import { default as axiosImport } from "axios";

export const axios = axiosImport.create({
  baseURL: "https://frontend-test-api.aircall.dev",
  // baseURL:"http://localhost:5000/v1"
});
