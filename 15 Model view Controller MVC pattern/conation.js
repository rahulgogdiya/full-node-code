const mongoose = require("mongoose");
mongoose.set("strictQuery",true)

async function conectionMongoDB(url){
    return mongoose.connect(url)
}
module.exports = {
    conectionMongoDB
}