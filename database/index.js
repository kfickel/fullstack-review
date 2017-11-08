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
  fileId: Number,
  //repoUrl = html_url
  repoUrl: String,
  //fileName = name
  fileName: String,
  //forks = forks (for popularity)
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (obj) => {
  Repo.create({
    ownerId: obj.owner.id,
    login: obj.owner.login,
    fileId: obj.id,
    repoUrl: obj.html_url,
    fileName: obj.name,
    forks: obj.forks
  }, function (err, obj) {
    if (err) {
      return handleError(err);
    }
    console.log('Saved ', obj);
  })
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;