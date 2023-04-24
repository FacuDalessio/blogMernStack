const mongoose = require("mongoose");

const conection = async () =>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/mi_blog");
        console.log("Conectado correctamente a la Bd");
    } catch (error) {
        console.log(error)
        throw new Error("No se a podido conectar a la base de datos");
    }
}

module.exports = {
    conection
}