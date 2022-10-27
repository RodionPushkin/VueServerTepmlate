let peer = new Peer(undefined, {
    host: 'https://rodionpushkin.ru/',
    secure: true,
    port: '443',
    path: '/'
});
peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
    document.getElementById('text').innerHTML = id
});
let conn = undefined
peer.on('connection', function (connection) {
    console.log(connection)
    conn = connection
    conn.on('open', () => {
        console.log(conn)
        // Receive messages
        conn.on('data', (data) => {
            console.log('Received', data);
        });
    })
});
let i = 0
document.getElementById('button').addEventListener('click', () => {
    console.log('click')
    conn = peer.connect(document.getElementById('input').value);
    // peer.connect(document.getElementById('input').value).then(res=>{
    //     console.log(res)
    // })
    // console.log(1)
    // setTimeout(()=>{
    //     console.log(2)
    //     conn.on('open', ()=>{
    //         console.log(conn)
    //         // Receive messages
    //         conn.on('data', (data) => {
    //             console.log('Received', data);
    //         });
    //     })
    // },300)
})
document.getElementById('send').addEventListener('click', () => {
    if (conn) {
        i++
        console.log('Hello!' + i)
        conn.send('Hello!' + i);
    }
})