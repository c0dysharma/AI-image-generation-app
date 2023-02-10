import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../models/postModel.js';
import validateUser from '../middlewares/authMiddleware.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();
router
  .route('/')
  .get(async (req, res) => {
    try {
      const allPosts = await Post.find({});
      res.status(200).json({ success: true, data: allPosts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error });
    }
  })
  .post(validateUser, async (req, res) => {
    try {
      const { name, prompt, photo } = req.body;
      const photoUrl = await cloudinary.uploader.upload(photo);
      const newPost = await Post.create({ name, prompt, photo: photoUrl.url });

      res.status(201).json({ success: true, data: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error });
    }
  });

export default router;
