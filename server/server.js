const path=require('path');
const express=require('express');
const {generateMessage,generateLocationMessage}=require('./utils/message');
//const {generateLocationMessage}=require('./utils/message');

const publipath=path.join(__dirname,"../public");
//console.log(__dirname+"../public ");

const socketIO=require('socket.io');

//console.log("io .........."+socketIO);
const http=require('http');
const port=process.env.PORT || 3000;
//console.log(publipath);





//here express use as a webserver and we use http built in module to create server
// var app=express();
// var server=http.createServer((req,res)=>{
//
// });

var app=express();
var server=http.createServer(app);
//we want to communicate on this particular server
var io=socketIO(server);

// this function listen the client and connect with it
// io.on is only used for make an connection
io.on('connection', (socket) => {
  console.log('New user connected');

   socket.emit('NewEmail',
 {
      name:"shubham koolwal",
      text:"hey it's from server"
 });
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

  socket.on('CreateEvent',(NewEmail)=>{
    console.log('create email',NewEmail);
  });

socket.emit('newMessage',generateMessage('Admin','Welcome to chat App'));
socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

  socket.on('createMessage', (message,callback) => {
     console.log('createMessage', message);
    //  io.emit('newMessage', {
    //    from: message.from,
    //    text: message.text,
    //    createdAt: new Date().getTime()
    //  });
//     socket.broadcas.emit('newMessage', {
      io.emit('newMessage1', {
       from: message.from,
       text: message.text,
       createdAt: new Date().getTime()
     });
     callback();
   });

   socket.on('createLocationMessage', (coords) => {
     io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude, coords.longitude));
   });




});
app.use(express.static(publipath));

server.listen(port,()=>{


  console.log("server start at port "+ port);
});
