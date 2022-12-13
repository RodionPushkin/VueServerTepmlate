module.exports = peer => {
  peer.on('connect', (client) => {
    console.log(client)
  });
  peer.on('disconnect', (client) => {
    console.lsog(client)
  });
}
