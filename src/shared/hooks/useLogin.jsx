import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest} from '../../services/api';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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

    const logout = ()=>{
        localStorage.removeItem('token');
        navigate('/')
    }

    return { login, logout, isLoading };
}
