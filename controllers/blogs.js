import { Blog } from "../models/Blog.js";
import { StatusCodes } from "http-status-codes";

export const BlogControllers = {
  newBlog: async (req, res) => {
    try {
    } catch (error) {
      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        success: false,
        error: error.message,
      });
    }
  },
  updateBlog: async (req, res) => {
    try {
    } catch (error) {
      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        success: false,
        error: error.message,
      });
    }
  },
  deleteBlog: async (req, res) => {
    try {
    } catch (error) {
      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        success: false,
        error: error.message,
      });
    }
  },
  getAllBlogs: async (req, res) => {
    try {
    } catch (error) {
      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        success: false,
        error: error.message,
      });
    }
  },
  getBlogData: async (req, res) => {
    try {
    } catch (error) {
      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        success: false,
        error: error.message,
      });
    }
  },
  getFavouriteBlogs: async (req, res) => {
    try {
    } catch (error) {
      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        success: false,
        error: error.message,
      });
    }
  },
  getBookmarks: async (req, res) => {
    try {
    } catch (error) {
      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        success: false,
        error: error.message,
      });
    }
  },
};
