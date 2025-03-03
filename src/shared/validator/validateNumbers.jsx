export const validateNumbers = (number='') => {
    if(number<1){
        return false;
    }
     return /^[0-9]*$/.test(number);
}

export const validateNumbersMessage = 'Ingrese solo números mayores a 0';