import express from "express";
import { createServer } from 'node:http';
import { Server } from "socket.io";
import ejs from 'ejs';

const app = express();
const PORT = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server);



app.engine('html', ejs.renderFile);
app.set('view engine', ejs);
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index.html');
});


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(PORT, () => {
    console.log('server running at http://localhost:3000');
})