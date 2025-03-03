
export const validateText = (value='')=>{
    const regex = /^[a-zA-Z\s]*$/;
    if(regex.test(value)===false){
        return false;
    }
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