var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shango",
  database: "shikayat",
  charset: "utf8"
});

var given_id = "1";

con.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...');
})

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/' , function(req, res){

  
  fs.readFile("./home.html", function(err, data) {

		if(err){
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Page not found");
		}
		else{
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
		        return res.end();
		}
  });
  
  

})

app.get('/complain.html', function(req, res){

  con.connect(function(err){
  fs.readFile("./complain.html", function(err, data) {

		if(err){
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Page not found");
		}
		else{
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
		        return res.end();
		}
  });
  
  });
 
})



app.post('/process_complaint' ,urlencodedParser , function(req, res){

  response = {
    query_depart:req.body.query_depart,
    query_about:req.body.query_about,
    query_explain:req.body.query_explain 
  };

  var sql = 'INSERT INTO problem (query_depart, query_about, query_explain) VALUES ?' 
  var postData = [[response.query_depart, response.query_about, response.query_explain]];

  con.connect(function(err){

     con.query(sql, [postData], function(err, result){

       if(err) throw err;
       var final = result.insertId
       console.log("1 value is inserted and the id is = " + final);
       given_id = final;
       res.writeHead(400, {'Content-Type': 'text/html'});
       res.write('ID given to you is : ' + given_id + '<br/>');
       res.write('Enjoy baccho!!' + '<br/>');
       res.end(JSON.stringify(response));
  
     });
  
  });  

})

//var reo ='<html><head><title>Node.js MySQL Select</title></head><body><h1>{${table}}</body></html>';

function setResHtml(sql, cb){

    con.query(sql, (err, res, field)=>{
      if(err) throw err;

      var table =''; //to store html table

      //create html table with data from res.
      for(var i=0; i<res.length; i++){
        table +='<tr><td>'+ res[i].query_depart +'</td><td>'+ res[i].query_about + '</td><td>' + res[i].query_explain + '</td></tr>';
      }
      table ='<table border="1"><tr><th>Query_Depart</th><th>Query_About</th><th>Query_Explain</th></tr>'+ table +'</table>';
      return cb(table);
    });
}

app.get('/all_complaints' , function(req, result){

  var sql = "SELECT query_depart, query_about, query_explain FROM problem";
  con.connect(function(err){
  setResHtml(sql, resql=>{
    var reo ='<html><head><title>Node.js MySQL Select</title></head><body><h1>{${table}}</body></html>';
    reo = reo.replace('{${table}}', resql);
    result.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    result.write(reo, 'utf-8');
    result.end();
  });

  });

})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

