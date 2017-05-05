const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1');


const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

const broadcast = (data) => {
  for(let client of wss.clients) {
    // console.log('BROADCASTTTTTT============',client);
    client.send(data);
  }
}

const connectedUsers =[]
const colors = ['message-username-green', 'message-username-blue', 'message-username-yellow', 'message-username-red']

const randColor = () => {
  const i = Math.floor(Math.random() * 4);
  return colors[i];
} 

const handleMessage = (message, color) => {
  const outgoing = JSON.parse(message);
  outgoing.id = uuidV1();
  if(outgoing.type === 'postMessage'){
    outgoing.type = 'incomingMessage';
    outgoing.color = color;
  } else {
    outgoing.type = 'incomingNotification'
  }

  broadcast(JSON.stringify(outgoing));
}
const connectedCount = () => {
  const count = wss.clients.size;
  return {
    type: 'systemMessage',
    count: wss.clients.size
  };
}

const handleConnection = (client) => {
  const clientColor = randColor();
  broadcast(JSON.stringify(connectedCount()));
  client.on('message', (message) => handleMessage(message, clientColor));
  client.on('close', () => {
    broadcast(JSON.stringify(connectedCount()));
  });
}


wss.on('connection', handleConnection);