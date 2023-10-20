const express = require("express");
const app = express();

app.use(express.static("app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

var session = require("express-session");

app.use(
    session(
        {
            secret:"HELLo nODE",
            resave: false,
            saveUninitialized: false,
        }));

var rotas = require("./app/routes/router");
app.use("/", rotas);

/*
const posts = [
  { id: 1, title: 'Post 1', content: 'Conteúdo do Post 1' },
  { id: 2, title: 'Post 2', content: 'Conteúdo do Post 2' },
  { id: 3, title: 'Post 3', content: 'Conteúdo do Post 3' },
];

app.get('/comunidade', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Feed</title>
    </head>
    <body>
      <h1>Feed de Posts</h1>
      <ul>
        ${posts.map(post => `<li><strong>${post.title}</strong>: ${post.content}</li>`).join('')}
      </ul>
    </body>
    </html>
  `);
});*/




app.listen(5500, () =>{
    console.log(`Servidor ouvindo na porta 5500`);
});