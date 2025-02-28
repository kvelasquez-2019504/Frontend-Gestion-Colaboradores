
export const Input = ({ field,
    label,
    placeholderText,
    value,
    onChangeHandler,
    type,
    classNameInput,
    showErrorMessage,
    validationMessage,
    onBlurHandler
}) => {

    const handleValueChange = (event) => {
        onChangeHandler(event.target.value, field);
    };
    const handleInputBlur = (event) => {
        onBlurHandler(event.target.value, field);
    };

    return (
        <>
            <div>
                <input
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleInputBlur}
                    placeholder={placeholderText}
                    className="w-full px-3 py-2 mt-2 text-gray-800 bg-transparent border 
                    rounded-lg shadow-sm outline-none"
                />
                <span className="text-red-500 w-full">
                    {showErrorMessage && validationMessage}
                </span>
            </div>
        </>
    )
}
