var json = require('./teams.json');
var fs = require('fs');
var request = require('request');
var mime = require('mime-types');
fs.writeFileSync("text.txt", "");
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename+"."+mime.extension(res.headers['content-type']))).on('close', callback);
  });
};


// console.log(json)
for (var i of json.teams){
  let dir = "./"+i.abbrev;
  let text = "=".repeat(60)+"\n";
  if (!fs.existsSync(dir)){
    let val = i.region + " " + i.name;
    let l = 60-val.length;
    text += " ".repeat(Math.floor(l/2)) + val + " ".repeat(Math.ceil(l/2));
    text += "\nImage url:\n"+i.imgURL+"\n";
    val = "Folder: " + dir;
    l = 60-val.length;
    text += " ".repeat(Math.floor(l/2)) + val + " ".repeat(Math.ceil(l/2));
    text += "\n";
    fs.mkdirSync(dir);
    fs.writeFileSync("text.txt", fs.readFileSync("text.txt")+text);
    download(i.imgURL, dir+"/logo", a=>console.log('done'));
  }
  i.imgURL = "https://mamamia5x.github.io/BBGM-College/" + i.abbrev + "/" + fs.readdirSync(dir)[0];
}
fs.writeFileSync("College.json", JSON.stringify(json));