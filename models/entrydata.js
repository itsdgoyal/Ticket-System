const mongoose = require('mongoose')
const entryschema = mongoose.Schema({
    vehicleno:String,
    vehicletype:String,
    entrytime:String,
    exittime:String,
    amount:Number,
    status:String
})
module.exports = mongoose.model('entrydata',entryschema)