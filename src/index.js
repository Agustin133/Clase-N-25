const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const { options } = require('./conection')
const { chats } = require('./create_model');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

// Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(flash());

app.use(session({
    store: MongoStore.create({ 
        mongoUrl: 'mongodb://localhost/sesiones',
        ttl: 10 * 60, // 10 min
    }),
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false
}));


app.use((req, res, next) => {
    app.locals.messages = req.flash('success');
    next();
});

app.use(require('./routes/index'));

let messages = [];

io.on('connection', (socket) => {
    socket.emit('messages',messages);

    socket.on('all-messages', function(data) {
        messages.push(data);
        io.sockets.emit('messages',messages);
        console.log(messages);
        const ch = new chats(data);
        ch.save();
        async function msj() {
            const response = await chats.find();
            io.sockets.emit('messages',response)
        }
        msj()
    });
});


http.listen( 3000, () => {
    console.log('Server on port: http://localhost:3000');
});
