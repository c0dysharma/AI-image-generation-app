import * as dotenv from 'dotenv';
import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const openAiConfig = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(openAiConfig);

const router = express.Router();
router
  .route('/')
  .get((req, res) => res.send('Hello, World from DALL-E'))
  .post(async (req, res) => {
    const { prompt } = req.body;

    try {
      const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: '256x256',
        response_format: 'b64_json',
      });

      const image = aiResponse.data.data[0].b64_json;
      res.status(200).json({ photo: image });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.response.data.error.message);
    }
  });

export default router;
