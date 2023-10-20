const express = require("express");
const app = express();

app.use(express.static("app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

var session = require("express-session");
const port = process.env.PORT || '500';


app.use(
    session(
        {
            secret:"HELLo nODE",
            resave: false,
            saveUninitialized: false,
        }));

var rotas = require("./app/routes/router");
app.use("/", rotas);

app.listen(port, () =>{
    console.log(`Servidor ouvindo na porta 500`);
});