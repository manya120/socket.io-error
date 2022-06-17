// 1.npm Infinity
// 2. npm install -to make this work
// 3.start server at command prompt by writing node httpserver.js

// node js file
var express = require("express");
var app = express();

app.listen(7070,startup);
function startup(){
    console.log("server started at port 7070");
}

// since express does not support static data, so to import static files or pages in express , we use  this
app.use(express.static(__dirname));

//it is better to seperate port of express and soket-io

// socket-io , uses http also
var http = require("http");
var server = http.createServer();
server.listen(9090);

var socketio =require("socket.io");
// first create http server then socketio server then link them
var io = socketio(server); 

// receive request on server and send response to browser 
// on starting port , we will see this html page on browser as response
app.get("/" , (req,res)=>{
    res.sendFile(__dirname + "/index.html");
    });

io.on("connect",function(client){
console.log("new client connected");

client.on("clientmessage",function(data){
    //this data received what the client sent to server using server.emit({message})
console.log("client message received");
console.log(data);  // representing json
var data2= JSON.parse(data); //data2 representing object
console.log(data2);
console.log(data2.message); //we cannot use data.message
});
});

