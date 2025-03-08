
export const validateText = (value='')=>{
    if(value.trim().length>45){
        return false;
    }
    if(value.trim().length==0){
        return false;
    }else{
        return true;
    }
}

export const validateTextMessage = `El campo necesita de (1-45) letras`;