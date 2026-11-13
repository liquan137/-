/**
 * Local stand-in for the IoT socket server the login page calls at
 * ws://127.0.0.1:5000. It issues an RSA public key and accepts any login.
 */
const http = require('http')
const { generateKeyPairSync } = require('crypto')
const socketio = require('socket.io')

const { publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
})

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end('iot dev socket\n')
})

const io = socketio(server, { serveClient: false })

io.on('connection', (socket) => {
  socket.on('key', () => {
    socket.emit('key', publicKey)
  })
  socket.on('login', (payload) => {
    const user = payload && payload.user ? String(payload.user) : ''
    const msg = user ? `欢迎，${user}` : '登录成功'
    socket.emit('msg', JSON.stringify({ msg, type: 'success' }))
  })
})

server.listen(5000, '0.0.0.0', () => {
  console.log('dev socket listening on 5000')
})
