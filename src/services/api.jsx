import axios from 'axios'
import { toast } from 'react-hot-toast';
const API = axios.create({
    baseURL: "http://localhost:8000",
    timeout:5000
});

API.interceptors.request.use(
    (config) => {
      const getToken = localStorage.getItem("token");
      if (getToken) {
        config.headers.Authorization = `${getToken}`;
      }
      return config;
    },
    (e) => {
        toast.error(e.response);
      return Promise.reject(e);
    }
);

export const login = async (data)=>{
    try {
        const response = await API.post("/login", data );
        return response;
    } catch (e) {
        return{
            error:true,
            e
        }
    }
}

export const getColaborator=async(data)=>{
    try {
        const response = await API.get(`/get/colaborador?page=${data.page}&pageSize=${data.pageSize}`);
        return response.data;
    } catch (e) {
        return{
            error:true,
            e
        }
    }
}

export const getColaboratorById=async(data)=>{
    try {
        console.log(data)
        const response = await API.get(`/find/colaborador/${data.idColaborador}`);
        return response;
    } catch (e) {
        return{
            error:true,
            e
        }
    }
}

export const postColaborator= async(data)=>{
    console.log(data)
    try {
        const response = await API.post('/post/colaborador',data);
        return response;
    } catch (e) {
        return{
            error:true,
            e
        }
    }
}

export const putColaborator = async(data)=>{
    try {
        const response = await API.put(`/put/colaborador/${data.IDCOLABORADOR}`, data);
        return response;
    } catch (e) {
        return{
            error:true,
            e
        }
    }
}

export const deleteColaborator = async(data)=>{
    try {
        const response = await API.delete(`/delete/colaborador/${data.idColaborador}`);
        return response;
    } catch (e) {
        return{
            error:true,
            e
        }
    }
}