import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: {
    Authorization: "Bearer 06921f9d-5d6a-4cde-b24a-02816749f900",
    "API-KEY": "519e09f9-9dad-4c6c-8d50-5948d8b0629c",
  },
})

/*instance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("sn-token")}`

  return config
})*/

/*export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
})*/
