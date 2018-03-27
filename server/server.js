require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");
var { ObjectID } = require("mongodb");

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, e => {
        res.status(400).send(e);
    });
});


app.get("/todos/:id", (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({error: "Not a valid ID"});
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({error: "Todo not found"});
        }

        res.send({todo});
    }).catch(e => res.status(400).send(e));
});

app.delete("/todos/:id", (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({error: "Not a valid ID"});
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({error: "Todo not found"});
        }

        res.send({todo});
    }).catch(e => res.status(400).send(e));
});

app.patch("/todos/:id", (req, res) => {
    var id = req.params.id;

    var body = _.pick(req.body, ["text", "completed"]);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({error: "Not a valid ID"});
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    })
    .then((todo) => {
        if (!todo) {
            return res.send(404).send({error: "Todo not found"});
        }

        res.send({todo});

    }).catch(e => {
        res.status(400).send(e)
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

module.exports = { app };