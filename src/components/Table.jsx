import { Button } from "./Button"
import { useColaborator } from "../shared/hooks/useColaborator";
import { toast } from "react-hot-toast";

export const Table = ({ isLoading, colaborators, setColaborator, setViewForm, setEditColaborator, setLoadingList }) => {
    const { getColaboratorById, deleteColaborator } = useColaborator();
    const onEdit = async (e) => {
        e.preventDefault();
        const response = await getColaboratorById(e.target.id);
        setColaborator(response.colaborator);
        setViewForm(true);
        setEditColaborator(true);
    }

    const onDelete = async (e) => {
        e.preventDefault();
        await deleteColaborator(e.target.id);
        setLoadingList((prev) => !prev);
    }

    const onNotificationEdad = (e) => {
        e.preventDefault();
        const edad = e.target.id;
        if (edad >= 18 && edad <= 25) {
            toast.success('FUERA DE PELIGRO', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
        }
        if (edad >= 26 && edad <= 50) {
            toast.success('TENGA CUIDADO, TOME TODAS LAS MEDIDAS DE PREVENCIÓN', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
        } 
        if(edad>=51){
            toast.success('POR FAVOR QUÉDESE EN CASA', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
        }
    }

    return (
        <div className="w-auto text-center grid grid-rows-1 items-center p-2">
            <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100 text-center">
                        <th className="py-3 px-4">Nombre</th>
                        <th className="py-3 px-4">Apellido</th>
                        <th className="py-3 px-4">Dirección</th>
                        <th className="py-3 px-4">Edad</th>
                        <th className="py-3 px-4">Profesión</th>
                        <th className="py-3 px-4">Estado Civil</th>
                        <th className="py-3 px-4">OPCIONES</th>
                    </tr>
                </thead>

                {isLoading ? (<div> cargando...</div>) : (<tbody>{
                    colaborators.map((col) => (
                        <tr key={col.IDCOLABORADOR} className="border-t">
                            <td className="py-3 px-4">{col.NOMBRE}</td>
                            <td className="py-3 px-4">{col.APELLIDO}</td>
                            <td className="py-3 px-4">{col.DIRECCION}</td>
                            <td className="py-3 px-4">{col.EDAD}</td>
                            <td className="py-3 px-4">{col.PROFESION}</td>
                            <td className="py-3 px-4">{col.ESTADOCIVIL}</td>
                            <td className="py-1 px-4 flex flex-row">
                                <Button typeBtn="button"
                                    className={'w-full rounded-md bg-yellow-500 py-0.5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-yellow-500 focus:shadow-none active:bg-yellow-600 hover:bg-yellow-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'}
                                    onClickBtn={onEdit} text={'EDITAR'} idBtn={col.IDCOLABORADOR} />
                                <Button typeBtn="button"
                                    className={'w-full rounded-md bg-red-800 py-0.5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-500 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 row-span-1'}
                                    onClickBtn={onDelete} text={'ELIMINAR'} idBtn={col.IDCOLABORADOR} />
                                <Button typeBtn="button"
                                    className={'w-full rounded-md bg-pink-500 py-0.5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-pink-500 focus:shadow-none active:bg-pink-600 hover:bg-pink-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 row-span-1'}
                                    onClickBtn={onNotificationEdad} text={'NIVEL DE RIESGO'} idBtn={col.EDAD} />
                            </td>
                        </tr>
                    ))
                }</tbody>)}
            </table>
        </div>
    )
}
