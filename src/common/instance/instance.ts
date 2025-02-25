import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: {
    "API-KEY": "519e09f9-9dad-4c6c-8d50-5948d8b0629c",
  },
})

instance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("sn-token") // Берем токен из localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (error) {
      console.error("Ошибка при получении токена:", error)
    }
    return config
  },
  (error) => {
    console.error("Ошибка в запросе:", error)
    return Promise.reject(error)
  },
)
/*export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: {
    Authorization: "Bearer 06921f9d-5d6a-4cde-b24a-02816749f900",
    "API-KEY": "519e09f9-9dad-4c6c-8d50-5948d8b0629c",
  },
})*/

/*instance.interceptors.request.use(function(config) {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("sn-token")}`;

  return config;
}) * /

/*export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
})*/

/*export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: {
    "API-KEY": "519e09f9-9dad-4c6c-8d50-5948d8b0629c",
  },
})*/

// Добавляем токен перед каждым запросом
/*
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("sn-token") // Берем токен из локального хранилища
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
*/
