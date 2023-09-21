import { connect } from "mongoose";

export const DbConnect = async () => {
  await connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Done its working in db");
    })
    .catch((error) => console.log(error));
};
