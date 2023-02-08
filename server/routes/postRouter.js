import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../models/postModel.js';

const router = express.Router();
router.get('/', (req, res, next) => res.send('Hello, World'));

export default router;
