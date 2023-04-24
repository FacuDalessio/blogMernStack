const {validateArticle} = require("../validate/validateArticle");
const Article = require("../models/Article");
const fs = require("fs");
const path = require("path");

const create = async (req, res) =>{

    let articleAux = req.body;

    try {
        
        validateArticle(articleAux);

    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "Faltan enviar datos !!",
        })    
    }

    try {
        const article = new Article(articleAux);
        const articleSaved = await article.save();
        
        return res.status(201).json({
            status: "Success",
            article: articleSaved,
            message: "Articulo guardado con exito !!"
        }) 
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "No se puedo guardar el articulo"
        }) 
    }
}

const getAll = async (req, res) =>{
    try {
        let articlesQuery = Article.find({}).sort({date: -1});

        if (req.params.limit) {
            articlesQuery.limit(3);
        }

        let articlesResult = await articlesQuery.exec();

        return res.status(200).json({
            status: "Success",
            articles: articlesResult 
        })
        
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "No se han podido obtener los articulos",
        }) 
    }
}

const getById = async (req, res) =>{
    let id = req.params.id;

    try {
        let article = await Article.findById(id).exec();

        return res.status(200).json({
            status: "Success",
            article: article 
        });
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "No se han podido obtener el articulo",
        }) 
    }
}

const deleteById = async (req, res) =>{
    let id = req.params.id;

    try {
        let articleDeleted = await Article.findOneAndDelete({_id: id});

        return res.status(200).json({
            status: "Success",
            articleDeleted: articleDeleted
        });
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "No se han podido borrar el articulo",
        }) 
    }
}

const updateById = async (req, res) =>{
    let id = req.params.id;
    let articleAux = req.body;

    try {
        
        validateArticle(articleAux);

    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "Faltan enviar datos !!",
        })    
    }

    try {
        const articleUpdate = await Article.findOneAndUpdate({_id: id}, articleAux, {
            new: true
          });
        return res.status(200).json({
            status: "Success",
            articleUpdated: articleUpdate
        });  
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "No se ha podido actualizar el articulo",
        }) 
    }
}

const uploadImage = async (req, res) =>{
    const file = req.file;
    const id = req.params.id;

    if (!file) {
        return res.status(400).json({
            status: "Error",
            message: "No se ha enviado la imagen",
        });
    }

    const fileSplit = file.originalname.split(".");
    const extension = fileSplit[1];

    if (extension != "png" && extension != "jpg" &&
        extension != "jpeg" && extension != "gif") {
        fs.unlink(req.file.path, (error) =>{
            res.status(400).json({
                status: "Bad request",
                message: "Solo se aceptan imagenes"
            });
        });
    }else{
        try {
            const articleUpdate = await Article.findOneAndUpdate({_id: id}, {image: file.filename}, {
                new: true
              });
            return res.status(200).json({
                status: "Success",
                articleUpdated: articleUpdate,
                file: file
            });  
        } catch (error) {
            return res.status(400).json({
                status: "Error",
                message: "No se ha podido cargar la imagen",
            }) 
        }
    }
}

const image = (req, res) =>{
    let filename = req.params.filename;
    let route = "./img/articles/" + filename;

    fs.stat(route, (error, exists) =>{
        if (exists) {
            return res.sendFile(path.resolve(route));
        }else{
            return res.status(400).json({
                status: "Error",
                message: "No se ha podido cargar la imagen",
                exists,
                filename,
                route
            }) 
        }
    })
}

const search = async (req, res) =>{
    let searching = req.params.searching;
    try {
        let articlesFinded = await Article.find({"$or": [
            {"title": {"$regex": searching, "$options": "i"}},
            {"content": {"$regex": searching, "$options": "i"}}
        ]})
        .sort({date: -1})
        .exec();
        return res.status(200).json({
            status: "Success",
            articlesFinded: articlesFinded
        });  
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "No se ha encontrado ningun articulo",
        }) 
    }
}

module.exports = {
    create,
    getAll,
    getById,
    deleteById,
    updateById,
    uploadImage,
    image,
    search
}