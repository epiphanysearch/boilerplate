var express = require('express');

var http = require('http');
var path = require('path');

var project = require('./config/project');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('connect-livereload')({ port: 35729 }));
app.use(express.directory(path.join(__dirname, 'build/dev/')));
app.use(express.static(path.join(__dirname, 'build/dev/')));

// development only
if ((process.env.NODE_ENV || 'development') === 'development') {
    app.use(express.errorHandler());
}

var devsite_redirect_path = project.devsite_redirect_path || '/devsite';

app.get(devsite_redirect_path, function (req, res) {
    var on_read = function (error, package_json) {
        if (error) {
            res.statusCode = 404;
            res.end("<h1>Unable to load package.json</h1>");
        }

        var package = JSON.parse(package_json);
        var parts = [package.client.string, package.project.string];
        res.redirect("http://" + parts.join("-") + ".development.stratus.epiphanydev.co.uk");
    };

    fs.readFile("package.json", on_read);
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
