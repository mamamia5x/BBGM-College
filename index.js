var json = require('./teams.json');
// console.log(json)
for (var i of json.teams){
  console.log(i.imgURL)
}