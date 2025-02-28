import { Input } from "../../components/Input"
import { Label } from "../../components/Label"
import { useState } from "react"
import { validateNumbers, validateNumbersMessage } from "../../shared/validator"
import { useLogin } from "../../shared/hooks/"
import "../../styles/button.css"

export const Login = () => {
    const { login, isLoading } = useLogin();
    const [formState, setFormState] = useState({
        IDCOLABORADOR: {
            value: "",
            isValid: false,
            showError: false,
        },
        EDAD: {
            value: "",
            isValid: false,
            showError: false,
        }
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value,
            },
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;

        switch (field) {
            case "IDCOLABORADOR":
                isValid = validateNumbers(value);
                break;
            case "EDAD":
                isValid = validateNumbers(value);
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

    const handleLogin = (event) => {
        event.preventDefault();
        login(parseInt(formState.IDCOLABORADOR.value), parseInt(formState.EDAD.value));
    }

    const buttonDisabled = isLoading || !formState.IDCOLABORADOR.isValid || !formState.EDAD.isValid;

    return (
        <div className="grid place-items-center h-screen border-white p-8 bg-white rounded-tr-2xl 
        rounded-br-2xl w-full min-md:w-2xl">
            <h1 className="text-4xl text-center font-semibold">BIENVENIDO A GESTION DE COLABORADORES</h1>
            <form className="flex text-2xl flex-col gap-2 max-sm:text-lg">
                <div className="w-xl max-sm:w-sm">
                    <Label htmlFor={"IDCOLABORADOR"} text={"ID Colaborador"} />
                    <Input
                        field="IDCOLABORADOR"
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        value={formState.IDCOLABORADOR.value}
                        type="number"
                        label="ID Colaborador"
                        placeholderText={"ID de colaborador"}
                        showErrorMessage={formState.IDCOLABORADOR.showError}
                        validationMessage={validateNumbersMessage}
                    />
                </div>
                <div className="w-xl max-sm:w-sm">
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
                        validationMessage={validateNumbersMessage}
                    />
                </div>
                <button onClick={handleLogin} disabled={buttonDisabled} className="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800 font-serif" id="btnLogin">
                    INICIAR SESION
                </button>
            </form>
        </div>
    )
}
