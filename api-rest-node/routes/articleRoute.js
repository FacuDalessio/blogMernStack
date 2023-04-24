const express = require("express");     
const router = express.Router();     
const articleController = require("../controllers/articleController");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./img/articles");
    },
    filename: (req, file, cb) =>{
        cb(null, "article" + Date.now() + file.originalname);
    }
})

const upload = multer({storage: storage});

router.post("/create", articleController.create);
router.get("/:limit?", articleController.getAll);
router.get("/article/:id", articleController.getById);
router.delete("/:id", articleController.deleteById);
router.put("/:id", articleController.updateById);
router.post("/img/:id", [upload.single("file")], articleController.uploadImage);
router.get("/img/:filename", articleController.image);
router.get("/search/:searching", articleController.search);


module.exports = router;