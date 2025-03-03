import axios from 'axios'
import { toast } from 'react-hot-toast';
const API = axios.create({
    baseURL: "http://localhost:8000",
    timeout:5000
});

// Interceptor para enviar el token en las peticiones a la API
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

//Consume el endpoint de login de la API
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

//Consume el endpoint de registro de la API para obtener los colaboradores
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

//Consume el endpoint de buscar colaborador por ID de la API para obtener un colaborador en especifico
export const getColaboratorById=async(data)=>{
    try {
        const response = await API.get(`/find/colaborador/${data.idColaborador}`);
        return response;
    } catch (e) {
        return{
            error:true,
            e
        }
    }
}

//Consume el endpoint de registro de la API para registrar un colaborador nuevo
export const postColaborator= async(data)=>{
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

//Consume el endpoint de la API para actualizar un colaborador
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

//Consume el endpoint de la API para eliminar un colaborador
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