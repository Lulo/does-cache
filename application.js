var express = require('express');
var app = express();

var config = {
  cache: 30 // seconds
};

var counter = 1;

var page = function (num) {
  return function (req, res, next) {
    counter++;
    var html = pageHTML(num);
    res.send(html);
  };
};

var pageHTML = function (num) {
  return [
    '<!doctype html>',
    '<html>',
    '<head>',
    '  <title>Page ' + num + '</title>',
    '</head>',
    '<body>',
    '  <p>Page ' + num + '</p>',
    '  <p>Count ' + counter + '</p>',
    '  <p><a href="/1">1</a> / <a href="/2">2</a></p>',
    '</body>',
    '</html>'
  ].join('\n');
};

app.configure(function () {
  app.use(function (req, res, next) {
    var expires = new Date(+new Date + (1000 * config.cache)).toUTCString();
    res.header('Expires', expires);
    res.header('Cache-Control', 'max-age=' + config.cache + ', must-revalidate');
  });
});

app.get('/1', page(1));
app.get('/2', page(2));

var port = process.env.PORT || 8000;
app.listen(8000);
console.log('Listening on port %d', port);

