import app from "../../src/app";
import request from "supertest";
import Mongoose from "mongoose";
import Task from "../../src/models/tasks";
describe("The tasks api", () => {
  beforeAll(async () => {
    console.log(process.env.DB_TEST_NAME);
    const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_TEST_NAME}`;
    console.log({ url });
    await Mongoose.connect(url, { useNewUrlParser: true })
      .then(resp => console.log({ resp }))
      .catch(err => console.log({ err }));
  });

  afterEach(async () => {
    await Task.deleteMany({});
  });

  afterAll(() => {
    Mongoose.connection.close();
  });

  it("Should find no tasks to start with", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Accept", "application/json");
    expect(res.body.tasks).toEqual([]);
    expect(res.status).toEqual(200);
  });

  it("Should be able to create a task", async () => {
    const res = await request(app)
      .post("/api/tasks/")
      .send({ title: "New test task", content: "The new content" });
    const task = await Task.findOne({ title: res.body.task.title });
    expect(task.content).toEqual(res.body.task.content);
  });

  it("Should be able to update a task", async () => {
    const newRes = await request(app)
      .post("/api/tasks/")
      .send({ title: "New test task", content: "The new content" });
    const res = await request(app)
      .patch(`/api/tasks/${newRes.body.task._id}`)
      .send({ title: newRes.body.task.title, content: "Updated content" });
    const task = await Task.findOne({ title: res.body.task.title });
    expect(task.content).toEqual("Updated content");
  });
});
