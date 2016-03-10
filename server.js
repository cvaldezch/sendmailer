// Generated by CoffeeScript 1.10.0
var http, path, port, send, sendMails, server, sys, url;

http = require('http');

path = require('path');

sys = require('sys');

url = require('url');

port = 3000;

server = null;

server = http.createServer(function(request, response) {
  var url_parts;
  url_parts = url.parse(request.url);
  switch (url_parts.pathname) {
    case '/':
      send(url_parts.pathname, request, response);
      break;
    default:
      null;
  }
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

send = function(_url, req, res) {
  var mailOptions, nodemailer, params, smtpTransport;
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
  });
  params = url.parse(req.url, true).query;
  if (/(.+)@(.+){2,}\.(.+){2,}/.test(params.email)) {
    nodemailer = require('nodemailer');
    smtpTransport = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
        user: 'elementospe@gmail.com',
        pass: 'buenosaires23'
      }
    });
    mailOptions = {
      from: params.name + " " + params.from,
      to: params.email,
      subject: params.subject,
      html: params.body
    };
    smtpTransport.sendMail(mailOptions, function(error, response) {
      if (error) {
        res.write('{"status": false, "raise": "nothing send mail"}');
        res.end();
      } else {
        res.write('{"status": true, "raise": "mail send"}');
        res.end();
      }
    });
  }
  console.log(params);
};

sendMails = function(_url, req, res) {
  console.log(url.parse(req.url, true).query);
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write("{'status': false}");
  res.end();
};

server.listen(port);

sys.puts("Server running at in port " + port + " localhost");