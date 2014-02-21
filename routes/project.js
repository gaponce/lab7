var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  // query for the specific project and
  models.Project
    .find({"_id": projectID})
    .exec(afterQuery);

  // call the following callback
  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  // make a new Project and save it to the DB
  var newPost = new models.Project({
    "title": form_data["project_title"],
    "date": form_data["date"],
    "summary": form_data["summary"],
    "image": form_data["image_url"]
  });

  newPost.save(afterSaving);

  // YOU MUST send an OK response w/ res.send();
  function afterSaving(err) {
    if (err) {console.log(err); res.send(500);}

      res.send();

      //redirect to home
      res.redirect('/');
  }
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  models.Project
    .find({"_id": projectID})
    .remove()
    .exec(afterRemoving);

  // YOU MUST send an OK response w/ res.send();
  function afterRemoving(err){
    res.send();
  }
}