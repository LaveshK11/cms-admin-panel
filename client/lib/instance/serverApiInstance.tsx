import axios , {AxiosRequestConfig} from "axios";

const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_API_URL

const axiosInstance = axios.create({
  baseURL: serverBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});



export const ServerApi = {
  get: <T,>(url: string, params?: object) =>
    axiosInstance.get<T>(url, {
      ...params,
      withCredentials: true,
    }),
  post: <T,>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, {
      // withCredentials: true,
    }),
  patch: <T,>(url: string, data: any) =>
    axiosInstance.patch<T>(url, data, {
      withCredentials: true,
    }),
  delete: <T,>(url: string) =>
    axiosInstance.delete<T>(url, {
      withCredentials: true,
    }),
};

export default ServerApi;
