const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

require('dotenv').config();
// Connection URL

 
// Database Name
var mongodb;

function connect(callback){
  // MongoClient.connect(process.env.DB_URL, function(err, client) {
  //   assert.equal(null, err);
  //   console.log("Connected successfully to server");
    
  //   db = client.db(process.env.DB_NAME);  

  mongoClient.connect(process.env.DB_URL, (err, client) => {
    console.log("Connected successfully to server");
    // mongodb = db;
    mongodb = client.db(process.env.DB_NAME);
    callback();
  });
}
function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    mongodb,
    close
};