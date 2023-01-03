const connectionService = require('./service/connection.service')
module.exports = peer => {
  peer.on('connection', async (client) => {
    // console.log(peer.all('/peerjs'))

    // peer.listAllPeers((data)=>{
    //   console.log(data)
    // })
    console.log(client.id,'connected')
    await connectionService.connect(client.token,client.id)
    // client.socket.on('message', data => {
    //   //message to filter
    //   console.log('from client:', data);
    // });
    // client.send({ hello: 'world' });

  });
  peer.on('disconnect', async (client) => {
    console.log(client.id,'disconnected')
    await connectionService.disconnect(client.token,client.id)
  });
  peer.on('customevent', async () => {
    // peer
    console.log("customevent")
  });
}
