const   mongoose = require ("mongoose");

function secrets(){
var mongooseURI = mongoose.connect("mongodb+srv://dbJekkit:Jekkit4321@jekkitclutser.adply.mongodb.net/test?authSource=admin&replicaSet=atlas-abqo76-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false }
)};

module.exports = secrets;
