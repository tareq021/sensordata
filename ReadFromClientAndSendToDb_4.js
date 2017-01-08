// Used Mixed type data

var request = require('request');
var express = require("express");
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
var path = require("path");
var ObjectID = mongodb.ObjectID;

var DATA_COLLECTION = "sensorData";

var app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 var db;

 mongodb.MongoClient.connect(process.env.MONGODB_URI,function(err,database){
     if(err){
         console.log(err);
         process.exit(1);
     }
     db=database;
     console.log("Database Connection Ready");

     var server = app.listen(process.env.PORT || 8080, function(){
     var port = server.address().port;
     console.log('Server running on',port);

 });
 }); 

 function handleError(response, reason, message, code) {
  console.log("ERROR: " + reason);
  response.status(code || 500).json({"error": message});
}

  app.post("/sensorData", function(request, response) {
      var rec_val=request.body;
      //rec_val.createDate = new Date();
      db.collection(DATA_COLLECTION).insertOne(rec_val,function(err,doc){
          if(err){
              handleError(response, err.message, "Failed to create new data.");
          }else{
              response.status(201).json(doc.ops[0]);
          }
      });      
      console.log(request.body);      
    //   response.send("Message received.");
    //   response.end();
});

