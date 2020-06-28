var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shango",
  database: "shikayat"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE problem (id INT AUTO_INCREMENT PRIMARY KEY, query_depart VARCHAR(255), query_about VARCHAR(255), query_explain VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
