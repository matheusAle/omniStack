const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://matheus:<pass>@cluster0-oa4s5.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());
app.use(morgan('dev'));

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('./routes'));

require('dns').lookup(require('os').hostname(), function (err, add, fam) {

    app.set('host', add);
    app.set('port', 3333);

    server.listen(app.set('port'), app.set('host'), () => {
        console.log(`started in ${app.set('host')}:${app.set('port')}`)
    });

});

