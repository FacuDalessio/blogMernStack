export const Request = async (url, methodProp, objectSave = "", image = false) => {

    let charging = true;

    let options = {
        method: methodProp
    }

    if (methodProp == "POST" || methodProp == "PUT") {
        
        if (image) {
            options = {
                method: methodProp,
                body: objectSave
            }
        }else{
            options = {
                method: methodProp,
                body: JSON.stringify(objectSave),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }
    }

    let peticion = await fetch(url, options);
    let data = await peticion.json();

    charging = false;

    return {
        data,
        charging
    }
}