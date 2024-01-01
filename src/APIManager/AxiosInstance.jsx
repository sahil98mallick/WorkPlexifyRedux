import axios from "axios"

export const AxiosInstance = axios.create({
    baseURL: "https://personalnodeserver.vercel.app/workplexify/"
})
// export const AxiosInstance = axios.create({
//     baseURL: "https://workplexifyserver.onrender.com/"
// })