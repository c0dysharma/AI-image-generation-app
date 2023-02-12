import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
