var mysql = require("mysql");


module.exports = function(){
 return mysql.createConnection({
  host: "containers-us-west-141.railway.app",
  user: "root",
  password: "FZglkaXAxHmLgEFnVOsV",
  database: "spreadfree",
  port: 6147
  });
}

