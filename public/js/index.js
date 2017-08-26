
var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedtime=moment(message.createdAt).format('h:mm a');

  console.log('newMessage', message);
       var li=jQuery('<li></li>');
       //li.text('${message.from}: ${message:text}');
       li.text(`${message.from} ${formattedtime}: ${message.text}`);
       jQuery('#messages').append(li);

});

socket.on('newMessage1', function (message) {
 var formattedtime=moment(message.createdAt).format('h:mm a');
  console.log('newMessage', message);
       var li=jQuery('<li></li>');
       //li.text('${message.from}: ${message:text}');
       li.text(`${message.from} ${formattedtime}: ${message.text}`);
       jQuery('#messages').append(li);

});

socket.on('newLocationMessage',function(message){

  var formattedtime=moment(message.createdAt).format('h:mm a');

  var li=jQuery('<li></li>');
  //li.text('${message.from}: ${message:text}');
  var a=jQuery('<a target="_blank">Target My Location </a>');
   li.text(`${message.from} ${formattedtime}:`);
   a.attr('href',message.url);
   li.append(a);
  jQuery('#messages').append(li);

});

// socket.emit('createMessage',{
//     from:'shubham',
//     text:'from shubham'
// },(data)=>{
//   console.log("got it",data);
// });


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
     locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
       latitude: position.coords.latitude,
       longitude: position.coords.longitude
     });
    console.log("current position ",position);
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
