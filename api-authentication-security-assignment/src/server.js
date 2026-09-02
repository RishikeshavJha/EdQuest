import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'development-only-secret-change-me';

const users = [
  {
    id: 1,
    username: 'student',
    passwordHash: bcrypt.hashSync('Password123!', 10),
    role: 'user'
  }
];

function authenticateToken(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Use a Bearer token.' });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

app.get('/', (req, res) => {
  res.json({
    name: 'Secure Notes API',
    message: 'Token-based authentication demonstration',
    endpoints: {
      login: 'POST /login',
      protected: 'GET /api/profile',
      notes: 'GET /api/notes'
    }
  });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  const user = users.find(item => item.username === username);

  if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const token = jwt.sign(
    { sub: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '30m' }
  );

  res.json({
    message: 'Login successful',
    token,
    tokenType: 'Bearer',
    expiresIn: '30m'
  });
});

app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Protected profile data',
    user: req.user
  });
});

app.get('/api/notes', authenticateToken, (req, res) => {
  res.json({
    owner: req.user.username,
    notes: [
      { id: 1, title: 'API Security', content: 'Protect sensitive endpoints with authentication.' },
      { id: 2, title: 'Token Safety', content: 'Use HTTPS and short-lived access tokens.' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Secure Notes API running at http://localhost:${PORT}`);
});