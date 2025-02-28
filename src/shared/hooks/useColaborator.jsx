import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getColaborator as getColaboratorRequest,
    postColaborator as postColaboratorRequest,
    getColaboratorById as getColaboratorByIdRequest,
    putColaborator as putColaboratorRequest,
    deleteColaborator as deleteColaboratorRequest
} from '../../services/api';

export const useColaborator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [colaborators, setColaborators] = useState([]);

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

    return { getColaborator, postColaborator, getColaboratorById, putColaborator, deleteColaborator, colaborators, isLoading };
}
