import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import dalleRoute from './routes/dalleRouter.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/v1/dalle', dalleRoute);

export default app;
