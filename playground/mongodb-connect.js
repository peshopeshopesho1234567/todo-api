const { MongoClient } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        return console.log("Unable to connect ot MongoDB server!");
    }

    console.log("connected to MongoDB server");
    const db = client.db("TodoApp");

    // db.collection("Todos").insertOne({
    //     text: "Something to do",
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("Error while inserting document! ", err);
    //     }

    //     console.log("Successfully added: ", JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection("Users").insertOne({
    //     name: "Sislaf",
    //     age: 23,
    //     location: "Bulgaria"
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("Error while inserting user! ", err);
    //     }

    //     console.log("Successfully inserted: ", result.ops[0]._id.getTimestamp());
    // });

    client.close();
});