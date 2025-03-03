
import { Button } from "./Button"
import {useLogin } from '../shared/hooks/useLogin'
export const Sidebar = ({viewForm}) => {
    const {logout} = useLogin();
    
    const exit = (e)=>{
        e.preventDefault();
        logout();
    }

    return (
        <div className="max-w-sm min:w-sm text-center flex flex-col gap-y-15 pt-2 pb-2">
            <Button typeBtn="button" 
                className={'w-auto rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 h-15 font-extrabold top-0'} 
                onClickBtn={viewForm} text={'AGREGAR COLABORADOR'}/>
            <Button typeBtn="button" 
                className={'w-auto rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 h-15 font-extrabold' }
                onClickBtn={exit} text={'CERRAR SESION'}/>
        </div>
    )
}
