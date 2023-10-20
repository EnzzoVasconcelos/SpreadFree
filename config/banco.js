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

// var connection = mysql.createConnection({
  // host     : 'mygac-prod.cpqh76cssuzm.us-east-1.rds.amazonaws.com',
  // user     : 'root',
  // password : 'Mygacdb_2022',
  // database : 'teste'
// });

 var connection = mysql.createConnection({
  host     : 'containers-us-west-130.railway.app',
  user     : 'root',
  password : 'TsDMbJywYic8THlHNkBW',
  database : 'railway'
});
connection.connect();
return connection
}
