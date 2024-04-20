import WebSocket, { WebSocketServer } from 'ws';
import express from 'express';

const app = express();
const httpserver = app.listen(8080, function() {
  console.log((new Date()) + ' Server is listening on port 8080');
});

const wss = new WebSocketServer({ server:httpserver }); 
let count = 0;

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data,) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
  
  count = count+1;
  console.log('no of users',count)
  ws.send('Hello! Message From Server!!');
});

