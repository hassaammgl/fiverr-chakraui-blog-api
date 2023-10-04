import { User } from "../models/User.js";
import Joi from "joi";
import { bcryptPass, bcryptAnswer } from "../utils/Bcrypt.js";
import { JwtToken } from "../utils/Jwt.js";

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
  loginUser: async (req, res) => {
    try {
      // password regex
      var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      console.log("Login called");

      // user schema for validation purposes
      const userObjSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(30).pattern(passwordRegex).required(),
        confirmPassword: Joi.ref("password"),
      });
      // get error if exists
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
      // getting inputs from server
      const { email, password } = req.body;
      // check if email is existing or not
      const isUserExist = await User.findOne({ email });
      if (!isUserExist) {
        return res.status(500).json({
          success: false,
          error: "Email doesn't exist",
        });
      }
      // check the password is matched or not
      const isPasswordMatch = await bcryptPass.compareHash(
        password,
        isUserExist.password
      );
      if (!isPasswordMatch) {
        return res.status(500).json({
          success: false,
          error: "Password not matched! Please try again",
        });
      }
      const token = await JwtToken.sign(isUserExist._id);
      const options = {
        expiry: new Date(Date.now() + 3600000), // 1 hour
        maxAge: 3600000 * 12 * 30,
      };
      res.status(200).cookie("fiverrChakrauiBlogCookie", token, options).json({
        success: true,
        message: "User Login Successfull",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  securityQuestion: async (req, res) => {
    try {
      // get id from cookie
      const { _id } = req.user;
      // getting security question security answer
      const { securityQuestion, securityAnswer } = req.body;
      // getting user from db
      const user = await User.findOne({ _id: _id });
      //encrypting security question and answer
      const encryptedQuestion = await bcryptAnswer.hash(securityQuestion);
      const encryptedAnswer = await bcryptAnswer.hash(securityAnswer);
      // saving user securityAnswer and securityQuestion to save in db
      user.securityQuestion = encryptedQuestion;
      user.securityAnswer = encryptedAnswer;
      // saving user for db
      await user.save();

      res.status(200).json({
        success: true,
        message: "Security Qna's! saved successfully",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  forgetpassword: async (req, res) => {
    try {
      const { answer, email } = req.body;
      const user = await User.findOne({ email: email });
      console.log(user);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
