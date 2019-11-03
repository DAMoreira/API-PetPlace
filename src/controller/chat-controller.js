module.exports.respond = function(socket_io){
    
        socket_io.on('connection', function(connection) {
            console.log('User Connected');
            
            connection.on('message', function(msg){
              socket.emit('message', msg);
            });
          });

        }