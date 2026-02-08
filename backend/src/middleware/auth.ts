// import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

// const prisma = new PrismaClient();

// passport logic removed for simplicity since server.ts handles mock login
/*
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Mocking user find logic
        return done(null, { id: 'mock', email: profile.emails![0].value, name: profile.displayName });
      } catch (error: any) {
        return done(error, undefined);
      }
    }
  )
);
*/

export const generateToken = (user: any) => {
  return jwt.sign(
    { userId: user.id || user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET || 'reachinbox_secret_key_2024',
    { expiresIn: '7d' }
  );
};

export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'reachinbox_secret_key_2024';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, error: 'Invalid or expired token' });
  }
};
