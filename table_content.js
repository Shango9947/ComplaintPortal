var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shango",
  database: "shikayat"
});

con.connect(function(err) {
  if (err) throw err;

  var sql = "SELECT * FROM problem"; 

  con.query(sql, function(err, res){

    if(err) throw err;
    console.log(res);

  });  

});
