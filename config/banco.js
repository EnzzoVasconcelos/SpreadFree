var mysql = require("mysql");

module.exports = function(){
//  return mysql.createConnection({
  // host: "mygac-prod.cpqh76cssuzm.us-east-1.rds.amazonaws.com",
//   user: "root",
//   password: "Mygacdb_2022",
//   database: "teste",
//   port: 3066
//   });
// }

var connection = mysql.createConnection({
  host     : 'mygac-prod.cpqh76cssuzm.us-east-1.rds.amazonaws.com',
  user     : 'root',
  password : 'Mygacdb_2022',
  database : 'teste'
});
 
connection.connect();
return connection
}