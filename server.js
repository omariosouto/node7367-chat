const app = require('express')()

const http = require('http').Server(app) // Agrupa os servers
const io = require('socket.io')(http) // Tanto o Socketio quanto o Express Subiram

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home.ejs')
})

// Gerenciar o Chat
io.on('connection', function(socket) {
    console.log('Alguém ta conectado')

    socket.on('chat_message', (mensagemDoUsuario) => {
        console.log(mensagemDoUsuario)
        io.emit('chat_message', mensagemDoUsuario)
    })
})

http.listen(3000, () => {
    console.log('Servidor subiu!')
})

