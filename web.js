const express = require('express');
const http= require('http');
const fs = require('fs').promises;
const path = require('path');

var app = express();

    app.set('port', process.env.PORT || 8000);
    app.use(express.static(path.join(__dirname, 'public')));


const server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log(`Server is running on port ` + app.get('port'));
})

app.get('/', () => {
    res.sendfile('public/index.html');
})