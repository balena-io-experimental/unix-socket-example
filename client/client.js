'use strict';

const SOCKET = "/run/dsock";
const net = require('net');
const URL ='http://api.open-notify.org/iss-now.json'
const http = require('http');
let txt_string = ''

function send_msg(my_str){
    var client = net.createConnection(SOCKET)
        .on('connect', function (s) {
            console.log("Connected to " +SOCKET)
        })
        .on('data', function(data){
            data = data.toString();
            console.log('server said: ', data)
        })
    client.write(my_str)
    client.end()
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function init() {
    while (1<2){
        http.get(URL, function(resp){
            var body = '';
            resp.on('data', function(chunk) {
                body += chunk;
            });
            resp.on('end', function(){
                var timestamp = Date(JSON.stringify(JSON.parse(body).timestamp))
                var latitude = JSON.stringify(JSON.parse(body).iss_position.latitude)
                var longitude = JSON.stringify(JSON.parse(body).iss_position.longitude)
                txt_string = '\nISS position on: ' +timestamp + '\nlatitude: ' +latitude + 'longitude: ' +longitude +'\n'
            });
        });
        await sleep(30000);
        send_msg(txt_string)
    }
}

init()