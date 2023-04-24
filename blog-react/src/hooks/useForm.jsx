import { useState } from "react";

export const useForm = (objetoCompleto = {}) =>{
    
    const [object, setObject] = useState(objetoCompleto);

    const serializarForm = (target) =>{

        const formData = new FormData(target);

        const objectAux = {};

        for (const [name, value] of formData) {
            objectAux[name] = value;
        }

        return objectAux;
    }


    const submit = e =>{
        e.preventDefault();

        setObject(serializarForm(e.target));

    }

    const change = ({target})  =>{
        const {name, value} = target;

        setObject({
            ...object,
            [name]: value
        });
    }

    return{
        object,
        submit,
        change
    }
}