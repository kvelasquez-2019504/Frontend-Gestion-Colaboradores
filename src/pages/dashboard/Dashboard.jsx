import { Sidebar } from "../../components/"
import { Table } from "../../components/"
import { PageChange } from "../../components/"
import { Form } from "../../components/";
import { useState, useEffect } from "react";
import { useColaborator } from "../../shared/hooks/useColaborator";

export const Dashboard = () => {
    const [viewForm, setViewForm] = useState(false);
    const { getColaborator, isLoading} = useColaborator();
    const [colaborators, setColaborators] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] =useState(10);
    const [loadingList, setLoadingList] = useState(false);
    const [colaborator, setColaborator] = useState({IDCOLABORADODR:0,
        NOMBRE: "",
        APELLIDO: "",
        DIRECCION: "",
        EDAD: 0,
        PROFESION: "",
        ESTADOCIVIL: ""
    });
    const [editColaborator, setEditColaborator] = useState(false);
    
    const listColaborators = async () => {
        try {
            const response = await getColaborator( currentPage, pageSize);
            setColaborators(response.colaborators);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        listColaborators();
    }, [currentPage, loadingList]); 

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const changeVisibleForm = (e) => {
        if(editColaborator){
            setEditColaborator(true);
        }else{
            setColaborator({});
            setViewForm(!viewForm);
        }
    }

    return (
        <div className="p-2">
            <div className="flex flex-row bg-white w-full h-full rounded-2xl">
                <Sidebar viewForm={changeVisibleForm}></Sidebar>
                <div className="flex flex-col items-center justify-center m-auto pr-2 pl-2 pb-1">
                    {viewForm ? (<Form viewForm={viewForm} setViewForm={changeVisibleForm} setLoadingList={setLoadingList} loadingList={loadingList} colaborator={colaborator} edit={editColaborator} 
                    setEditColaborator={setEditColaborator}/>) 
                            : (null)}
                    <Table colaborators={colaborators} setViewForm={setViewForm} setEditColaborator={setEditColaborator} setColaborator={setColaborator} setLoadingList={setLoadingList}/>
                    <PageChange totalPages={totalPages} page={currentPage} changePage={handlePageChange}/>
                </div>
            </div>
        </div>
    )
}
