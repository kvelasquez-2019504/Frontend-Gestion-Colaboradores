export const validateNumbers = (number='') => {
    if(number.length === 0) return false;
    if(number < 1 || number > 120) return false;
    return true
}

export const validateNumbersMessage = 'Solo se permiten numeros del 1 al 120'