import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getColaborator as getColaboratorRequest,
    postColaborator as postColaboratorRequest,
    getColaboratorById as getColaboratorByIdRequest,
    putColaborator as putColaboratorRequest,
    deleteColaborator as deleteColaboratorRequest
} from '../../services/api';

// Custom hook que contiene las funciones para obtener, agregar, actualizar y eliminar colaboradores
export const useColaborator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [colaborators, setColaborators] = useState([]);

    // Función para obtener los colaboradores de la base de datos 
    const getColaborator = async (page = 1, pageSize=10) => {
        setIsLoading(true);
        const response = await getColaboratorRequest({page, pageSize});
        if(response.error || response.e){
            console.log(response.e.response.data.msg || response.e);
            setIsLoading(false);
            return toast.error( response.e.response.data.msg || "Error al obtener colaboradores");
        }
        setIsLoading(false);
        setColaborators(response.colaborators);
        toast.success("Se han cargado los colaboradores", { id: "clipboard" });
        return response;
    };

    // Función para obtener un colaborador por su id de la base de datos
    const getColaboratorById = async (idColaborador) => {
        setIsLoading(true);
        const response = await getColaboratorByIdRequest({idColaborador});
        if(response.error || response.e){
            console.log(response.e.response.data.msg || response.e);
            setIsLoading(false);
            return toast.error( response.e.response.data.msg || "Error al obtener al colaborador");
        }
        setIsLoading(false);
        toast.success(response.msg || "Se ha cargado el colaborador");
        return response.data;
    };

    // Función para agregar un colaborador a la base de datos
    const postColaborator = async(NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL)=>{
        setIsLoading(true);
        const response = await postColaboratorRequest({NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL});
        if(response.error || response.e){
            console.log(response.e.response.data.msg || response.e);
            setIsLoading(false);
            return toast.error( response.e.response.data.msg || "Error al agregar colaborador");
        }
        setIsLoading(false);
        setColaborators(response.data.colaborators);
        toast.success("Se ha añadido el colaborador");
    }

    // Función para actualizar un colaborador en la base de datos
    const putColaborator = async(IDCOLABORADOR, NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL)=>{
        setIsLoading(true);
        const response = await putColaboratorRequest({IDCOLABORADOR, NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL});
        if(response.error || response.e){
            console.log(response.e.response.data.msg || response.e);
            setIsLoading(false);
            return toast.error( response.e.response.data.msg || "Error al actualizar colaborador");
        }
        setIsLoading(false);
        setColaborators(response.data.colaborators);
        toast.success(`Se ha actualizado el colaborador`, {duration: 6000});
    }

    // Función para eliminar un colaborador de la base de datos
    const deleteColaborator = async (idColaborador) => {
        setIsLoading(true);
        const response = await deleteColaboratorRequest({idColaborador});
        if(response.error || response.e){
            console.log(response.e.response.data.msg || response.e);
            setIsLoading(false);
            return toast.error( response.e.response.data.msg || "Error al eliminar colaborador");
        }
        setIsLoading(false);
        toast.success(`Se ha eliminado el colaborador`);
    };
    
    // Retorna las funciones y los estados necesarios para el manejo de colaboradores
    return { getColaborator, postColaborator, getColaboratorById, putColaborator, deleteColaborator, colaborators, isLoading };
}
