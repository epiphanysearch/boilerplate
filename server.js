const express = require('express');

const http = require('http');
const path = require('path');

const projectPaths = require('./config/path');

const app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('connect-livereload')({ port: 35729 }));
app.use(express.directory(path.join(__dirname, 'build/dev/')));
app.use(express.static(path.join(__dirname, 'build/dev/')));
app.use(express.errorHandler());

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
