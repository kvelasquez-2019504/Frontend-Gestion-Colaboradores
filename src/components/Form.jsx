import { useEffect, useState } from "react";
import { Input } from "./Input"
import { Button } from "./Button"
import { Label } from "./Label"
import { validateText, validateTextMessage } from "../shared/validator/validateText";
import { validateEdad, validateEdadMessage } from "../shared/validator/";
import { useColaborator } from "../shared/hooks/useColaborator";
export const Form = ({ setLoadingList, loadingList, setViewForm, colaborator, edit, setEditColaborator }) => {
    const [formState, setFormState] = useState({
        NOMBRE: {
            value: colaborator.NOMBRE || "",
            isValid: false,
            showError: false
        },
        APELLIDO: {
            value: colaborator.APELLIDO || "",
            isValid: false,
            showError: false
        },
        EDAD: {
            value: colaborator.EDAD || "",
            isValid: false,
            showError: false
        },
        DIRECCION: {
            value: colaborator.DIRECCION || "",
            isValid: false,
            showError: false
        },
        PROFESION: {
            value: colaborator.PROFESION || "",
            isValid: false,
            showError: false
        },
        ESTADOCIVIL: {
            value: colaborator.ESTADOCIVIL || "",
            isValid: false,
            showError: false
        }
    });
    useEffect(() => {
        setFormState((prevState) => ({
            ...prevState,
            NOMBRE: {
                ...prevState.NOMBRE,
                value: colaborator.NOMBRE || ""
            },
            APELLIDO: {
                ...prevState.APELLIDO,
                value: colaborator.APELLIDO || ""
            },
            EDAD: {
                ...prevState.EDAD,
                value: colaborator.EDAD || ""
            },
            DIRECCION: {
                ...prevState.DIRECCION,
                value: colaborator.DIRECCION || ""
            },
            PROFESION: {
                ...prevState.PROFESION,
                value: colaborator.PROFESION || ""
            },
            ESTADOCIVIL: {
                ...prevState.ESTADOCIVIL,
                value: colaborator.ESTADOCIVIL || ""
            }
        }));
    }, [colaborator]);

    const { postColaborator, putColaborator, isLoading } = useColaborator();
    
    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value,
            },
        }));
        let isValid = false;

        switch (field) {
            case "NOMBRE":
                isValid = validateText(value);
                break;
            case "APELLIDO":
                isValid = validateText(value);
                break;
            case "EDAD":
                isValid = validateEdad(value);
                break;
            case "DIRECCION":
                isValid = validateText( value);
                break;
            case "PROFESION":
                isValid = validateText( value);
                break;
            case "ESTADOCIVIL":
                isValid = validateText(value);
                break;
            default:
                isValid = true;
                break;
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid,
            },
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;

        switch (field) {
            case "NOMBRE":
                isValid = validateText(value);
                break;
            case "APELLIDO":
                isValid = validateText(value);
                break;
            case "EDAD":
                isValid = validateEdad(value);
                break;
            case "DIRECCION":
                isValid = validateText(value);
                break;
            case "PROFESION":
                isValid = validateText(value);
                break;
            case "ESTADOCIVIL":
                isValid = validateText(value);
                break;
            default:
                isValid = true;
                break;
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid,
            },
        }));
    };

    const cleanForm = () => {
        setFormState({
            NOMBRE: {
                value: "",
                isValid: false,
                showError: false
            },
            APELLIDO: {
                value: "",
                isValid: false,
                showError: false
            },
            EDAD: {
                value: "",
                isValid: false,
                showError: false
            },
            DIRECCION: {
                value: "",
                isValid: false,
                showError: false
            },
            PROFESION: {
                value: "",
                isValid: false,
                showError: false
            },
            ESTADOCIVIL: {
                value: "",
                isValid: false,
                showError: false
            },
        });
    };

    const handlePostColaborator = async (e) => {
        e.preventDefault();
        if (edit) {
            await putColaborator(colaborator.IDCOLABORADOR, formState.NOMBRE.value, formState.APELLIDO.value, formState.DIRECCION.value, parseInt(formState.EDAD.value), formState.PROFESION.value, formState.ESTADOCIVIL.value
            );
            setLoadingList(!loadingList);
            setViewForm();
            cleanForm();
            setEditColaborator(false);
        } else {
            await postColaborator(formState.NOMBRE.value, formState.APELLIDO.value, formState.DIRECCION.value,
                parseInt(formState.EDAD.value), formState.PROFESION.value, formState.ESTADOCIVIL.value
            );
            setLoadingList(!loadingList);
            setViewForm();
            cleanForm();
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        cleanForm();
        setViewForm();
        setEditColaborator(false);
    }

    const btnDisable = isLoading || !formState.NOMBRE.isValid || !formState.APELLIDO.isValid || !formState.EDAD.isValid || !formState.DIRECCION.isValid || !formState.PROFESION.isValid || !formState.ESTADOCIVIL.isValid;

    return (
        <div className="grid grid-cols-3 grid-rows-3 w-4/5 h-3/4 bg-white rounded-xl shadow-lg p-2">
            <form  className="col-span-3 row-span-3 grid grid-cols-3 grid-rows-3 items-center gap-x-5">
                <div className="col-start-1 row-start-1">
                    <Label htmlFor={"NOMBRE"} text={"Nombre"} />
                    <Input
                        field="NOMBRE"
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        value={formState.NOMBRE.value}
                        type="text"
                        label="Nombre"
                        placeholderText={"Nombre"}
                        showErrorMessage={formState.NOMBRE.showError}
                        validationMessage={validateTextMessage}
                    />
                </div>
                <div className="col-start-2 row-start-1 ">
                    <Label htmlFor={"Apellido"} text={"Apellido"} />
                    <Input
                        field="APELLIDO"
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        value={formState.APELLIDO.value}
                        type="text"
                        label="Apellido"
                        placeholderText={"Apellido"}
                        showErrorMessage={formState.APELLIDO.showError}
                        validationMessage={validateTextMessage}
                    />
                </div>
                <div className="col-start-3 row-start-1">
                    <Label htmlFor={"EDAD"} text={"Edad"} />
                    <Input
                        field="EDAD"
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        value={formState.EDAD.value}
                        type="number"
                        label="Edad"
                        placeholderText={"Edad"}
                        showErrorMessage={formState.EDAD.showError}
                        validationMessage={validateEdadMessage}
                        min ="1"
                        max="120"
                    />
                </div>
                <div className="col-start-1 col-span-2 row-start-2">
                    <Label htmlFor={"DIRECCION"} text={"Direccion"} />
                    <Input
                        field="DIRECCION"
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        value={formState.DIRECCION.value}
                        type="text"
                        label="Direccion"
                        placeholderText={"Direccion"}
                        showErrorMessage={formState.DIRECCION.showError}
                        validationMessage={validateTextMessage}
                    />
                </div>
                <div className="col-start-3 row-start-2">
                    <Label htmlFor={"PROFESION"} text={"Profesion"} />
                    <Input
                        field="PROFESION"
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        value={formState.PROFESION.value}
                        type="text"
                        label="Profesion"
                        placeholderText={"Profesion"}
                        showErrorMessage={formState.PROFESION.showError}
                        validationMessage={validateTextMessage}
                    />
                </div>
                <div className="col-start-1 row-start-3">
                    <Label htmlFor={"ESTADOCIVIL"} text={"Estado Civil"} />
                    <Input
                        field="ESTADOCIVIL"
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        value={formState.ESTADOCIVIL.value}
                        type="text"
                        label="Estado Civil"
                        placeholderText={"Estado Civil"}
                        showErrorMessage={formState.ESTADOCIVIL.showError}
                        validationMessage={validateTextMessage}
                    />
                </div>
                <Button typeBtn="button"
                    className={' rounded-md bg-green-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none row-start-3 col-start-2 p-2 h-15'}
                    onClickBtn={handlePostColaborator} disabled={edit ? false : btnDisable} text={edit ? 'ACTUALIZAR' : 'GUARDAR'} />

                <Button typeBtn="button" className={' rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none row-start-3 col-start-3 h-15'} onClickBtn={handleCancel} text={'CANCELAR'} />
            </form>
        </div>
    )
}
