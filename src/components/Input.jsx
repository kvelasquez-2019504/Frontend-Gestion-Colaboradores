
export const Input = ({ field,
    placeholderText,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    ...restProps
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
                    className="w-full px-3 py-2 text-gray-800 bg-transparent border 
                    rounded-lg shadow-sm outline-none"
                    {...restProps}
                />
                <span className="text-red-500 sticky center">
                    {showErrorMessage && validationMessage}
                </span>
            </div>
        </>
    )
}
