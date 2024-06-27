import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    // Send a JSON response
    ws.send(JSON.stringify({ message: 'Hello, client!' }));
  });

  // Send a JSON message on connection
  ws.send(JSON.stringify({ message: 'Connection established' }));
});

console.log('WebSocket server is running on ws://localhost:8080');