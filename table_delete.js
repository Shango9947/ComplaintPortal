var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shango",
  database: "shikayat"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "DROP TABLE problem";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
});
