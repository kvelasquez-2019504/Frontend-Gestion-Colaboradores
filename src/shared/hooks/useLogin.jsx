import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest} from '../../services/api';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    //Funcion para iniciar sesion con el servidor, recibe el IDCOLABORADOR y la EDAD
    const login = async (IDCOLABORADOR, EDAD) => {
        setIsLoading(true);
        const response = await loginRequest({ IDCOLABORADOR, EDAD });
        if(response.error || response.e){
            console.log(response.e.response.data.msg || response.e);
            setIsLoading(false);
            return toast.error( response.e.response.data.msg ||"Error al iniciar sesión");
        }
        localStorage.setItem('token',`Bearer ${response.data.token}`);
        setIsLoading(false);
        toast.success( "Login correcto");
        navigate('/principal');
    };

    //Funcion para cerrar sesion, elimina el token del localstorage y redirige al login
    const logout = ()=>{
        localStorage.removeItem('token');
        navigate('/');
    }

    return { login, logout, isLoading };
}
