module.exports = class UsuarioDAL {

    constructor(conexao) {
        this.conexao = conexao;  
        this.findByTag("clei").then((results)=>{
            console.log(results)
        })
    }


    findAll() {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT u.id_usuario, t.id_tipo_usuario, u.user_name,  " +
                "u.email, u.senha, u.telefone, u.cidade, u.bairro , u.id_tipo_usuario," +
                " u.data_de_nasc, u.nome, t.descricao_usuario FROM usuario u, tipo_usuario t "
                + function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };

    findUserEmail(camposForm) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM usuario u WHERE user_name = ? or email = ?",
            [camposForm.user_name, camposForm.user_name],
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };

    findID(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT u.id_usuario, t.tipo, u.user_name,  " +
            "u.email, u.senha, u.telefone, u.cidade, u.bairro, " +
            " u.data_de_nasc, u.nome, t.id_tipo_usuario, t.descricao_usuario FROM usuario u, tipo_usuario t ", 
            [id], function (error, elements) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(elements);
                });
        });
    };
    create(camposJson) {
        return new Promise((resolve, reject) => {
            this.conexao.query("insert into usuario set ?",
                camposJson,
                function (error, elements) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
        });
    }
    update(camposJson) {
        return new Promise((resolve, reject) => {
            this.conexao.query(
                "UPDATE u.id_usuario, t.tipo, u.user_name,  " +
                "u.email, u.senha, u.telefone, u.cidade, u.bairro, " +
                " u.data_de_nasc, u.nome, t.id_tipo_usuario, t.descricao_usuario FROM usuario u, tipo_usuario t ",
                [camposJson.u.id_usuario, camposJson.t.tipo, camposJson.u.user_name,
                camposJson.u.email, camposJson.u.senha, camposJson.u.telefone,
                camposJson.u.cidade, camposJson.u.bairro, camposJson.u.data_de_nasc, camposJson.u.nome, camposJson.t.id_tipo_usuario,
                camposJson.t.descricao_usuario],
                function (error, results, fields) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
        });
    }
            
    delete(id) {
        return new Promise((resolve, reject) => {
            this.conexao.query("UPDATE usuario SET status_usuario = 0 WHERE id_usuario = ?", [id], function (error, results) {
                if (error) {
                    return reject(error);
                }
                return resolve(results[0]);
            });
        });
    }


    findByTag(tag){
        return new Promise((resolve, reject) => {
            this.conexao.query("SELECT * FROM usuario u WHERE u.user_name LIKE CONCAT('%',?,'%') ", [tag], function (error, results) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
}
