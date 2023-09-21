import { User } from "../models/User.js";
import Joi from "joi";
import { bcryptPass, bcryptAnswer } from "../utils/Bcrypt.js";

export const UserControllers = {
  registerUser: async (req, res) => {
    try {
      // password regex
      var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      console.log("register called");

      // user schema for validation purposes
      const userObjSchema = Joi.object({
        name: Joi.string().min(4).max(30).required(),
        email: Joi.string().email(),
        password: Joi.string().min(4).max(30).pattern(passwordRegex).required(),
        confirmPassword: Joi.ref("password"),
      });

      const { error } = userObjSchema.validate(req.body);
      // in case of error return error
      if (error) {
        console.log(error.message);
        if (error.message === `"confirmPassword" must be [ref:password]`) {
          return res.status(500).json({
            success: false,
            error: "Confirm Password is not matched with Password",
          });
        }
        return res.status(500).json({
          success: false,
          error,
        });
      }
      // getting user input from client
      const { name, email, password } = req.body;
      // check if user is already exist
      const isExist = await User.findOne({ email: email });
      if (isExist) {
        return res.status(500).json({
          success: false,
          error: "User already exists",
        });
      }
      // hashing password
      const hashedPassword = await bcryptPass.hash(password);
      // create new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      // save new user to database
      await newUser.save();
      // return response
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
  loginUser: async (req, res) => {},
  forgetpassword: async (req, res) => {},
  securityQuestion: async (req, res) => {},
};
