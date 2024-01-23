import axios from "axios";

const nextServerBaseUrl = process.env.NEXT_PUBLIC_INTERNAL_SERVER_BASE_URL;

const api = axios.create({
  baseURL: nextServerBaseUrl,
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
