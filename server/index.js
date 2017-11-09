const express = require('express');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  var username = '';
  req.on('data', function (chunk) {
    username += chunk;
  });
  req.on('end', function () {
    console.log('HERE')
    github.getReposByUsername(username, function() {
      res.status(201).send('');
    });
  })
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  db.retrieve(function(repos) {
    res.send(repos);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

