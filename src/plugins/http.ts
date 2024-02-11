import axios from "axios";

const baseConfig = { // AxiosRequestConfig
  // baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Origin": "http://localhost:5173/",
    // "Access-Control-Allow-Credentials": "true"
  },


    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
// headers.append('Access-Control-Allow-Credentials', 'true');
}
const http = axios.create(baseConfig) // AxiosInstance

http.interceptors.request.use((config) => {
  // const token = window.localStorage.getItem("token");
  // if (token) {
  //   config.headers["Authorization"] = `Token ${token}`;
  // }
  return config;
}, 
(error) => {
  // Do something with request error
  return Promise.reject(error);
})

http.interceptors.response.use((response) => { // AxiosResponse
  // console.log('response from http.ts', response. data)
  return response;
}, 
(error) => {
  // if (error.response) {
  //   if (error.response.status == 400) console.log('400')
  //   // ...
  // }
  return Promise.reject(error);
});

export default http