import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from './models/User';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'reachinbox_secret_key_2024';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/reachinbox';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (optional - works without MongoDB too)
let isMongoConnected = false;

import emailRoutes from './routes/emailRoutes';
import { authenticateToken } from './middleware/auth';

// API Routes
app.use('/api/emails', emailRoutes);

// Add /api/me for frontend compatibility
app.get('/api/me', authenticateToken, (req, res) => {
  // @ts-ignore
  res.json(req.user);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mongodb: isMongoConnected ? 'connected' : 'none' });
});

if (MONGODB_URI && MONGODB_URI !== 'mongodb://localhost:27017/reachinbox') {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('✅ MongoDB connected');
      isMongoConnected = true;
    })
    .catch((err) => {
      console.warn('⚠️  MongoDB not available:', err.message);
      console.log('📝 Running in demo mode without database');
    });
} else {
  console.log('📝 No MongoDB URI configured - running without database');
}

// Helper function to generate JWT
const generateToken = (userId: string, email: string, name: string) => {
  return jwt.sign(
    { userId, email, name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// POST /auth/login - Google OAuth (mock implementation for API calls)
app.post('/auth/login', async (req, res) => {
  try {
    const { provider = 'google' } = req.body;

    // Mock Google user
    const mockUser = {
      email: 'user@gmail.com',
      name: 'Google User',
      provider: 'google',
      googleId: 'google_' + Date.now(),
      avatar: 'https://ui-avatars.com/api/?name=Google+User&background=4285f4&color=fff',
    };

    // If MongoDB is connected, save user
    if (isMongoConnected) {
      try {
        let user = await User.findOne({ email: mockUser.email });

        if (!user) {
          user = await User.create({
            ...mockUser,
            lastLogin: new Date(),
          });
        } else {
          user.lastLogin = new Date();
          await user.save();
        }

        const token = generateToken(user._id.toString(), user.email, user.name);

        return res.json({
          success: true,
          token,
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            provider: user.provider,
          },
        });
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Fall through to mock response
      }
    }

    // Mock response if MongoDB not available
    const token = generateToken('mock_id_' + Date.now(), mockUser.email, mockUser.name);

    res.json({
      success: true,
      token,
      user: mockUser,
    });

  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Login failed',
    });
  }
});

// GET /auth/login - Google OAuth (mock implementation for browser redirect)
app.get('/auth/login', (req, res) => {
  const mockUser = {
    userId: 'mock_id_' + Date.now(),
    email: 'user@gmail.com',
    name: 'Google User'
  };
  
  const token = generateToken(mockUser.userId, mockUser.email, mockUser.name);
  
  // Redirect back to frontend with token
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  res.redirect(`${frontendUrl}/login-success?token=${token}`);
});

// POST /auth/demo - Demo Mode Login
app.post('/auth/demo', async (req, res) => {
  try {
    const demoUser = {
      email: 'demo@reachinbox.com',
      name: 'Demo User',
      provider: 'demo',
      avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=6366f1&color=fff',
    };

    // If MongoDB is connected, save demo user
    if (isMongoConnected) {
      try {
        let user = await User.findOne({ email: demoUser.email });

        if (!user) {
          user = await User.create({
            ...demoUser,
            lastLogin: new Date(),
          });
        } else {
          user.lastLogin = new Date();
          await user.save();
        }

        const token = generateToken(user._id.toString(), user.email, user.name);

        return res.json({
          success: true,
          token,
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            provider: user.provider,
          },
        });
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Fall through to mock response
      }
    }

    // Mock response if MongoDB not available
    const token = generateToken('demo_' + Date.now(), demoUser.email, demoUser.name);

    res.json({
      success: true,
      token,
      user: demoUser,
    });

  } catch (error: any) {
    console.error('Demo login error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Demo login failed',
    });
  }
});

// GET /health - Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ReachInbox API is running',
    mongodb: isMongoConnected ? 'connected' : 'not configured',
    timestamp: new Date().toISOString(),
  });
});

// GET /verify - Verify JWT token
app.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (error: any) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('\n🚀 ReachInbox API Server');
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📡 Running on: http://localhost:${PORT}`);
  console.log(`🗄️  MongoDB: ${isMongoConnected ? 'Connected' : 'Not configured (using mock data)'}`);
  console.log(`\n📧 Endpoints:`);
  console.log(`   POST /auth/login    - Google OAuth login`);
  console.log(`   POST /auth/demo     - Demo mode login`);
  console.log(`   GET  /verify        - Verify JWT token`);
  console.log(`   GET  /health        - Health check`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━\n`);
});
