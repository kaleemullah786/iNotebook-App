const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/iNotebook"
const connectTOMongo = () => {
    mongoose.connect(mongoURI, () => console.log("Connected to database sucessfully"))
}
module.exports = connectTOMongo;