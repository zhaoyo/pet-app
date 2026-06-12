import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { getDb } from './database';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/auth';
import petsRoutes from './routes/pets';
import checkinRoutes from './routes/checkin';
import uploadRoutes from './routes/upload';
import adminRoutes from './routes/admin';
import cardsRoutes from './routes/cards';
import eggsRoutes from './routes/eggs';

dotenv.config();

// Initialize DB (runs migrations)
getDb();

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const isProd = process.env.NODE_ENV === 'production';

app.use(cors({ origin: isProd ? false : '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/pets', petsRoutes);
app.use('/api/v1/checkin', checkinRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/cards', cardsRoutes);
app.use('/api/v1/eggs', eggsRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Serve frontend in production
if (isProd) {
  const frontendDist = path.join(__dirname, '..', '..', 'frontend', 'dist');
  app.use(express.static(frontendDist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🐾 宠物打卡后端启动成功！端口: ${PORT}`);
});

export default app;
