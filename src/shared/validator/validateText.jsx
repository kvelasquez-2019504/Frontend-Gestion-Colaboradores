
export const validateText = (field='',value='')=>{
    if(value.length>45){
        return false;
    }else if(value.length==0){
        return false;
    }else{
        return true;
    }
}

export const validateTextMessage = `El campo no debe estar vacio, ni ser mayor a 45 caracteres`