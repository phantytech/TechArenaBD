import express from 'express';
import cors from 'cors';
import routes from './routes';
import { seedDemoEvents } from './seed';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Seed demo events on startup
seedDemoEvents().catch(console.error);

// API routes
app.use(routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
