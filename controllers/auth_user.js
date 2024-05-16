import { Router } from 'express';
import { login, logout } from '../repositories/autentication.js';
import { authMiddleware } from '../middlewares/middleware.js';
import { loginSchema } from '../schemas/index.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const credentials = loginSchema.validateSync(req.body, { stripUnknown: true });
    const user = await login(credentials.username, credentials.password);
    res.json(user);
  } catch (ex) {
    res.status(401).send();
  }
});

router.post('/logout', authMiddleware, async (req, res) => {
  try {
    logout(req);
    res.status(204).send();
  } catch (ex) {
    res.status(404).send(ex);
  }
});

export default router;
