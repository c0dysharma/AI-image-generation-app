import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import validateUser from '../middlewares/authMiddleware.js';

const generateJWTtoken = (id) =>
  jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const router = express.Router();
router.route('/signup').post(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    const token = generateJWTtoken(newUser._id);
    return res.status(200).json({ success: true, token });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ success: false, messsage: e });
  }
});

router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // check if user exists and password is correct
  if (!user || !(await user.validatePassword(password, user.password)))
    return res
      .status(400)
      .send({ success: false, messsage: 'Email or password is incorrect' });

  const token = generateJWTtoken(user._id);
  return res.status(200).json({ success: true, token });
});

router.route('/').get(validateUser, (req, res) =>
  res.status(200).json({
    success: true,
    data: { name: req.user.name, email: req.user.email },
  })
);

export default router;
