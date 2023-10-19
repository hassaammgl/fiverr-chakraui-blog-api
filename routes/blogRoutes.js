import express from "express";
import { auth } from "../utils/Auth.js";
import { BlogControllers } from "../controllers/blogs.js";

const router = express.Router();

router.get("/get-blog-data", BlogControllers.getBlogData);
router.get("/get-all-blogs", BlogControllers.getAllBlogs);
router.get("/fav", auth, BlogControllers.getFavouriteBlogs);
router.get("/bookmarks", auth, BlogControllers.getBookmarks);
router.post("/new-blog", auth, BlogControllers.newBlog);
router.put("/update-blog-data", auth, BlogControllers.updateBlog);
router.delete("/delete-blog", auth, BlogControllers.deleteBlog);

export { router };
