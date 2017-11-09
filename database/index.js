const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  //data comes in an array of objects
  //owenerId = owner.id
  ownerId: Number,
  //login = owner.login
  login: String,
  //fileId = id
  repoId: Number,
  //repoUrl = html_url
  repoUrl: String,
  //fileName = name
  fileName: String,
  //forks = forks (for popularity)
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (arrObj) => {
  // console.log('array ', arrObj);
  for (var i = 0 ; i < arrObj.length; i++) {
    let obj = arrObj[i];
    Repo.find({repoId: obj.id})
    .then (function (repoObj) {
      console.log('OBJ ', repoObj);
      if (repoObj.id !== obj.id) {
        Repo.create({
          ownerId: obj.owner.id,
          login: obj.owner.login,
          repoId: obj.id,
          repoUrl: obj.html_url,
          fileName: obj.name,
          forks: obj.forks
        }, function (err, obj) {
          if (err) {
            return handleError(err);
          }
          console.log('Saved ', obj);
        })
      }
    })
    .catch(function(obj) {
      console.log('here');
    })
  }
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;