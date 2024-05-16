import { users } from '../repositories/autentication.js';

export const authMiddleware = (req, res, next) => {
  const authToken = req.get('x-authorization');

  if (!authToken) {
    return res.status(401).json({ error: 'Authorization token is missing. Please use the X-Authorization header.' });
  }

  const user = users.find(user => user.token === authToken);

  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  next();
};
