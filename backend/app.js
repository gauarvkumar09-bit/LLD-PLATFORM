const express = require('express');
const authRoutes = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const submissionRoutes = require('./routes/submission.routes');
const { generalLimiter } = require('./middlewares/rateLimiter');
const cors = require('cors');
const app = express();

const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // Specific origin ke saath hi cookies allow hongi
  })
);


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/api', generalLimiter);
// API Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Server is running fine!');
});

app.use('/api/submissions', submissionRoutes);
module.exports = app;