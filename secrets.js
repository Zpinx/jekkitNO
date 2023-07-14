const   mongoose = require ("mongoose");

function secrets(){
    var mongooseURI = mongoose.connect("mongodb+srv://dbJekkit:Jekkit4321@jekkitcluster.fjac8eo.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false }
)};

module.exports = secrets;


