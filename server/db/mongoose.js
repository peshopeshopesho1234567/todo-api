var mongoose = require("mongoose");
var { Schema } = mongoose;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

module.export = {
    mongoose
};