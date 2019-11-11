import Mongoose from "mongoose";

export const startDatabase = () => {
  Mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  )
    .then(success => console.log({ success }))
    .catch(error => console.log(error));
};
