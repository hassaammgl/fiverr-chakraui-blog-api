import jwt from "jsonwebtoken";

const secretKey =
  "a1da36ac7655af46020e9a11c092353fd42adb341fe92093796308d75f12IamKing101";

export const JwtToken = {
  sign: async (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET || secretKey);
  },
  verify: async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET || secretKey);
  },
};
