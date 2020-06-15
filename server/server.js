'use strict';

const net = require('net');
const fs = require('fs');

const SOCKET = "/run/dsock";

try {
    if (fs.existsSync(SOCKET)) {
        console.log('socket file already exists, removing it')
        fs.unlinkSync(SOCKET)
    }
} catch(err) {
    console.error('problem unlinking socket')
    console.error(err)
    process.exit(0)
}

const udServer = net.createServer(function(stream) {
    stream.on('data', function(msg){
        msg = msg.toString();
        console.log('client said: ', msg);
    });
}).listen(SOCKET);

udServer.on

udServer.on('connection', (s) => {
    console.log('client connected to ', SOCKET);
    s.write('hi client');
})