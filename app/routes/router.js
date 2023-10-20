var express = require("express");
var router = express.Router();

var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(12);

var fabricaDeConexao = require("../../config/banco");
var conexao = fabricaDeConexao();

var UsuarioDAL = require("../public/js/UsuarioDAL");
var usuarioDAL = new UsuarioDAL(conexao);

var { verificarUsuAutenticado, limparSessao, gravarUsuAutenticado,
  verificarUsuAutorizado } = require("../public/js/autenticador_middleware");

const { body, validationResult } = require("express-validator");

const multer = require('multer');
const path = require('path');
const TipoUsuarioDAL = require("../public/js/TipoUsuarioDAL");
var tipoUsuarioDAL = new TipoUsuarioDAL(conexao);
// ****************** Versão com armazenamento em diretório
// Definindo o diretório de armazenamento das imagens
var storagePasta = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './app/public/imagem/perfil/') // diretório de destino  
  },
  filename: (req, file, callBack) => {
    callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    //renomeando o arquivo para evitar duplicidade de nomes
  }
})

var upload = multer({ storage: storagePasta });
router.get("/", function (req, res) {
  res.render("pages/home", { tarefas: null });
});

router.post("/pesquisa", verificarUsuAutenticado, async function (req, res) {
  try {
    var results = null
    let pesquisa = req.body.pesquisa;
    console.log(pesquisa)
    results = await usuarioDAL.findByTag(pesquisa)
    console.log(results)
    res.render("pages/home", { tarefas: results, autenticado: req.session.autenticado });
  } catch (e) {
    console.log(e)
  }
});

router.get("/pesquisa", verificarUsuAutenticado, async function (req, res) {
  // idUsuario = req.params.id_usuario;
  req.session.login = req.query.login;
  idUsuario = req.query.idusuario;
  result = await usuarioDAL.findID(idUsuario);
  res.render("pages/perfilusu", { login: req.session.login, dadosUsuario: result, autenticado: req.session.autenticado });
});

router.get("/perfilusu", verificarUsuAutenticado, function (req, res) {
  req.session.autenticado.login = req.query.login;
  res.render("pages/perfilusu", { login: req.session.autenticado.login, autenticado: req.session.autenticado })
});

router.get("/adm", function (re, res) {
  res.render("pages/adm")
});

router.get("/login", function (req, res) {
  res.render("pages/login")
});

router.get("/cadastro", async function (req, res) {
  result = await tipoUsuarioDAL.findAll()
  res.render("pages/cadastro", result)
});

router.get("/premium", function (req, res) {
  res.render("pages/premium")
});

router.get("/Comunidade", function (req, res) {
  res.render("pages/Comunidade")
});

router.get("/discovery", function (req, res) {
  res.render("pages/discovery")
});

router.get("/ajuda", function (req, res) {
  res.render("pages/ajuda")
});

router.get("/sobre", function (req, res) {
  res.render("pages/sobre")
});

router.get("/perfilFernanda", function (req, res) {
  res.render("pages/perfilFernanda")
});

router.get("/perfilRaphaela", function (req, res) {
  res.render("pages/perfilRaphaela")
});

router.get("/perfilRenato", function (req, res) {
  res.render("pages/perfilRenato")
});

router.get("/confeiteiro", function (req, res) {
  res.render("pages/confeiteiro")
});

router.get("/editordevideo", function (req, res) {
  res.render("pages/editordevideo")
});

router.get("/empregada", function (req, res) {
  res.render("pages/empregada")
});

router.get("/pedreiro", function (req, res) {
  res.render("pages/pedreiro")
});

router.get("/professorparticular", function (req, res) {
  res.render("pages/professorparticular")
});

router.get("/programadorweb", function (req, res) {
  res.render("pages/programadorweb")
});

router.get("/", verificarUsuAutenticado, function (req, res) {
  res.render("pages/home", req.session.autenticado);
});

router.get("/sair", limparSessao, function (req, res) {
  res.redirect("/");
  console.log(`Deslogou com Sucesso`)
});

router.post(
  "/login",
  body("Email")
    .isLength({ min: 4, max: 45 })
    .withMessage("O nome de usuário/e-mail deve ter de 8 a 45 caracteres"),
  body("Senha").isStrongPassword()
    .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)"),

  gravarUsuAutenticado(usuarioDAL, bcrypt),
  function (req, res) {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      console.log(erros);
      return res.render("pages/login", { listaErros: erros })
    }
    console.log(req.session);
    if (req.session.autenticado != null) {
      //mudar para página de perfil quando existir
      console.log(`Logado com sucesso`)
      res.render("pages/perfilusu", req.session.autenticado);
    } else {
      res.render("pages/login", { listaErros: erros })
    }

  });

router.post("/cadastro",

  body("Nome").isLength({ max: 255 }),
  body("Email").isEmail(),
  body("Telefone").isNumeric(),
  body("nascimento").isDate(),
  body("Senha").isStrongPassword()
    .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)"),

  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      // return res.render("pages/html", { erros: errors, dados: req.body });
      return res.json(errors);
    }

    var dadosForm = {
      nome: req.body.Nome,
      email: req.body.Email,
      telefone: req.body.Telefone,
      cidade: req.body.Cidade,
      bairro: req.body.bairro,
      data_de_nasc: req.body.nascimento,
      senha: bcrypt.hashSync(req.body.Senha, salt),
      foto_perfil: "vazio",
      user_name: req.body.user_name,
      id_tipo_usuario: req.body.seuPerfil
    };

    conexao.query(
      "INSERT INTO usuario SET ?",
      dadosForm,
      function (error, results, fields) {
        if (error) throw error;
        // Neat!
      }
    );

    res.redirect("/");
  })

router.get("/adm", verificarUsuAutorizado([1], "pages/restrito"), function (req, res) {
  res.render("pages/adm", req.session.autenticado);
});

router.get("/editar", function (req, res) {
    res.render("pages/editar", req.session.autenticado);
  });
  

router.post("/editar", upload.single('img-perfil'),
    body("Nome").isLength({ min: 5, max: 45 }).withMessage("Digite Um nome que tenha de 5 à 45 Digitos"),
    body("user_name").isLength(),
    body("Email").isEmail(),
    body("Senha").isStrongPassword(),
    body("Telefone").isNumeric(),
  
    function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        // return res.render("pages/html", { erros: errors, dados: req.body });
        return res.json(errors);
      }
  
      var dadosForm = {
        nome: req.body.Nome,
        email: req.body.Email,
        telefone: req.body.Telefone,
        senha: bcrypt.hashSync(req.body.Senha, salt),
        user_name: req.body.user_name,
        foto_perfil: null
      };

      conexao.query(
        "UPDATE usuario SET nome= ?, user_name = ?,"+
        " email = ?, senha = ?, telefone = ? ,  WHERE usuario = ?",
        [dadosForm.nome_tarefa, dadosForm.email, dadosForm.user_name,
          dadosForm.telefone, dadosForm.senha, foto_perfil],
        function (error, results, fields) {
          if (error) throw error;
          // Neat!
        }
      );
      res.render("pages/perfilusu", req.session.autenticado);
});




module.exports = router;