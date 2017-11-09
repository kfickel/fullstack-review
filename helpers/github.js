const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username, cb) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      var info = JSON.parse(body);
      console.log('GITHUB')
      db.save(info, cb);


    } else {
      console.log('ERROR ', err);
    }
  })

}

module.exports.getReposByUsername = getReposByUsername;