import { User } from "../models/User.js";
import { bcryptPass, bcryptAnswer } from "../utils/Bcrypt.js";
import { JwtToken } from "../utils/Jwt.js";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export const UserControllers = {
  registerUser: async (req, res) => {
    try {
      // password regex
      console.log("register called");
      // getting user input from client
      const { name, email, password, confirmPassword } = req.body;
      if (!name || !email || !password || !confirmPassword) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
          status: false,
          error: "Please fill all the fields",
        });
      }
      if (password !== confirmPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          error: "Password and current password do not matched",
        });
      }
      // check if user is already exist
      const isExist = await User.findOne({ email: email });
      if (isExist) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
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
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User registered successfully",
      });
    } catch (error) {
      console.log(error.message);
      res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        success: false,
        error: error.message,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      // password regex
      console.log("Login called");

      // getting user input from client
      const { email, password, confirmPassword } = req.body;
      if (!email || !password || !confirmPassword) {
        return res.status(403).json({
          status: false,
          error: "Please fill all the fields",
        });
      }
      if (password !== confirmPassword) {
        return res.status(403).json({
          success: false,
          error: "Password and current password do not matched",
        });
      }
      // check if email is existing or not
      const isUserExist = await User.findOne({ email });
      if (!isUserExist) {
        return res.status(500).json({
          success: false,
          error: "User doesn't exist",
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
      // checking if security Q/A is existing or not
      const qna = await User.findOne({ securityQuestion: securityQuestion });
      if (!qna) {
        // getting user from db
        const user = await User.findOne({ _id: _id });
        //encrypting security question and answer
        const encryptedAnswer = await bcryptAnswer.hash(securityAnswer);
        // saving user securityAnswer and securityQuestion to save in db
        user.securityQuestion = securityQuestion;
        user.securityAnswer = encryptedAnswer;
        // saving user for db
        console.log("::", user);
        await user.save();
      } else {
        return res.status(406).json({
          success: false,
          error: "Question is already Exists",
        });
      }

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

  getSecurityQuestion: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }
      const securityQuestion = await bcryptAnswer.compareHash();
      console.log(securityQuestion);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  forgetpassword: async (req, res) => {
    try {
      const { answer, email, newPassword } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }
      const comparedAnswer = await bcryptAnswer.compareHash(
        answer,
        user.securityAnswer
      );
      if (!comparedAnswer) {
        return res.status(404).json({
          success: false,
          error: "Answer not matched",
        });
      }
      const hashedPassword = await bcryptAnswer.hash(newPassword);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
