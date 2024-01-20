import axios from "axios";

const ServerApi = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    // transformRequest: [
    //     (data: any) => {
    //         return JSON.stringify(data);
    //     },
    // ],
    // transformResponse: [
    //     (data: any) => {
    //         return JSON.parse(data);
    //     },
    // ],
});

export default ServerApi;
