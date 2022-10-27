let peer = new Peer(undefined, {
    host: 'rodionpushkin.ru',
    secure: true,
    port: '443',
    path: '/peerjs'
});
// let peer = new Peer(undefined, {
//     host: 'localhost',
//     port: '80',
//     path: '/'
// });
let self
let connections = {

}
peer.on('open', function (id) {
    self = id
    document.getElementById('text').innerHTML = id
});
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream=>{
    let video = document.createElement('video')
    video.muted = true
    video.srcObject = stream
    video.addEventListener('loadedmetadata', ()=>{
        video.play()
    })
    document.body.append(video)
    let video2 = document.createElement('video')
    peer.on('call', function (call) {
        console.log('call')
        if(connections.call == undefined && call.peer != self){
            connections.call = call
            connections.call.answer()
            connections.call.on('stream',(videostream)=>{
                console.log(1)
                video2.srcObject = videostream
                video2.addEventListener('loadedmetadata', ()=>{
                    video2.play()
                })
                document.body.append(video2)
            })
            console.log(connections.call)
            connections.call = peer.call(connections.call.peer,stream);
        }
    });
    document.getElementById('button').addEventListener('click', () => {
        peer.call(document.getElementById('input').value,stream);
    })
})