const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  ownerId: Number,
  login: String,
  repoId: Number,
  repoUrl: String,
  repoName: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let createRepo = (obj) => {
  Repo.create({
    ownerId: obj.owner.id,
    login: obj.owner.login,
    repoId: obj.id,
    repoUrl: obj.html_url,
    repoName: obj.name,
    forks: obj.forks
  }, function (err, obj) {
    if (err) {
      return handleError(err);
    }
  })
}

let save = (arrObj, cb) => {
  for (let i = 0 ; i < arrObj.length; i++) {
    let obj = arrObj[i];
    Repo.find({repoId: obj.id}, function(err, repo) {
      if (err) {
        handleError(err);
      }
      if(repo[0] !== undefined) {
        if (repo[0].repoId !== obj.id){
          createRepo(obj);
        }
      } else {
        createRepo(obj)
      }
      if (i === arrObj.length - 1) {
        cb();
      }
    })
  }
}

let retrieve = (cb) => {
  Repo.find({}).sort({forks: -1}).exec(function (err, results) {
      cb(results.slice(0,25));
    })

}

module.exports.save = save;
module.exports.retrieve = retrieve;