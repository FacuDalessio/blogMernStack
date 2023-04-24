const validator = require("validator");

const validateArticle = (body) =>{
    let validator_title = !validator.isEmpty(body.title) && 
                        validator.isLength(body.title, {min: 5, max: undefined});
    let validator_content = !validator.isEmpty(body.content);

    if (!validator_title || !validator_content) {
        throw new Error("Error en validar los datos");
    }
}

module.exports = {
    validateArticle
}