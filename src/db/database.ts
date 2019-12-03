import Mongoose from "mongoose";

export const startDatabase = () => {
  const databaseName =
    process.env.node_env === "test"
      ? process.env.DB_TEST_NAME
      : process.env.DB_NAME;
  console.log({ databaseName });
  Mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${databaseName}`
  )
    .then(success => console.log({ success }, "Success"))
    .catch(error => console.log(error, "Error"));
};
