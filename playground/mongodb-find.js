const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if (err) {
        return console.log("Unable to connect to database!");
    }

    const db = client.db("TodoApp");

    // db.collection("Todos").find({
    //     _id: new ObjectID("5aa10f092e0cd4f575f40293")
    // }).toArray().then((docs) => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log("Unable to fetch todos ", err);
    // });

    // db.collection("Todos").find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log("Unable to fetch todos ", err);
    // });

    db.collection("Users").find({name: "Kolio"}).toArray().then((docs) => {
        console.log("Users");
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Unable to query users!: ", err);
    });

    db.collection("Users").find().count().then((count) => {
        console.log(`The number of users is: ${count}`);
    }, (err) => {
        console.log("Error while querying users count: ", err);
    });

    client.close();
});