const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");
const { User } = require("./../models/user");

const todosTest = [
    {
        _id: new ObjectID(),
        text: "First test todo"
    },
    {
        _id: new ObjectID(),
        text: "Second test todo"
    }
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todosTest);  
    }).then(() => done());
});

describe("POST /todos", () => {
    it("should create a new todo", (done) => {
        var text = "Test todo text";

        request(app)
            .post("/todos")
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(e => done(e));
            });
    });

    it("should not create todo with invalid data", (done) => {
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(todosTest.length);
                    done();
                }).catch(e => done(e));
            })
    });
});

describe("GET /todos", () => {
    it("should get all todos", (done) => {
        request(app)
            .get("/todos")
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(todosTest.length)
            })
            .end(done);
    });
});

describe("GET /todos/:id", () => {
    it("should return todo doc", (done) => {
        request(app)
            .get(`/todos/${todosTest[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todosTest[0].text);
            })
            .end(done);
    });

    it("should return 404 if todo not found", (done) => {
        request(app)
            .get("/todos/5aa12b4d50ef9ba020fb9d2c")
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe("Todo not found");
            })
            .end(done)
    })

    it("should return 400 if invalid ID is provided", (done) => {
        request(app)
            .get("/todos/123")
            .expect(404)
            .end(done);
    });
});