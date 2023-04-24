const {conection} = require("./database/conection");
const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/articleRoute");

conection();

const app = express();
const puerto = 3900

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/articles", articleRoutes);

app.listen(puerto, () => {
    console.log("Escuchando en el puerto: " + puerto);
})

