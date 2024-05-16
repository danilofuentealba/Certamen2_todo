import express from 'express';
import cors from 'cors';

import userAuthRoutes from './controllers/auth_user.js';
import todoRoutes from './controllers/todos.js';

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use('/api', userAuthRoutes);
app.use('/api', todoRoutes);

export default app;
