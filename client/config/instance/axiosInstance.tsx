import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    (data: any) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data: any) => {
      return JSON.parse(data);
    },
  ],
});

export default api;
