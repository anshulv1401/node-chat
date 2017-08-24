
// we make an io so that cient an communicate with the server
 var socket=io();


socket.on('connect',()=>
{

  console.log("connected to server");
  socket.emit('CreateEvent',{
           name:'Koolwal Shubham',
           text:'hey its from client'
  })
});


socket.on('disconnect',()=>
{
  console.log("disconnected from server");
});


socket.on('NewEmail',(email)=>
{
  console.log("New Email is created",email);
});
