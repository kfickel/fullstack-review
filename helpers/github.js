const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  // console.log('username ', username);
  // console.log('url ', `https://api.github.com/users/${username}/repos`);
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
      // console.log('info ');
      db.save(info);

    } else {
      console.log('ERROR ', err);
    }
  })

}

module.exports.getReposByUsername = getReposByUsername;