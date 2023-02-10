import { promisify } from 'es6-promisify';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

const validateUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!(authorization && authorization.split(' ')[0] === 'Bearer'))
    return res.status(401).send({
      success: false,
      messsage: 'No authorization token found, Please login again.',
    });

  // verify token
  const token = authorization.split(' ')[1];
  const decodedData = await promisify(jwt.verify)(token, process.env.JWT_TOKEN);

  // check if user exists
  const user = await User.findById(decodedData.id);
  if (!user)
    return res.status(401).send({
      success: false,
      messsage: 'Authorization error, please login again',
    });

  req.user = user;
  next();
};

export default validateUser;
