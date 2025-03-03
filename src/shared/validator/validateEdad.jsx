export const validateEdad = (edad='') => {
    
    if(edad<1  || edad>120){ 
        return false;
    }
    return true;
}

export const validateEdadMessage = 'Ingrese una edad válida (1-120)';