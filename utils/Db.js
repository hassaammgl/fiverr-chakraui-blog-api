import { connect } from "mongoose";

export const DbConnect = async () => {
  await connect(process.env.MONGO_URI_2 || process.env.MONGO_URI_1, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Done its working in db");
    })
    .catch((error) => console.log(error));
};
