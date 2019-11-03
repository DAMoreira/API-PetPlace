module.exports.respond = function(socket_io){
    // this function expects a socket_io connection as argument

    // now we can do whatever we want:
   
        socket_io.on('connection', function(connection) {
            console.log('User Connected');
            
            connection.on('message', function(msg){
              socket.emit('message', msg);
            });
          });

        }