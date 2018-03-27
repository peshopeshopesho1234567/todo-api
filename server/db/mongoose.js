var mongoose = require("mongoose");
var { Schema } = mongoose;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.export = {
    mongoose
};