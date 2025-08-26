// src/app.ts
import express from 'express';
import demoRoutes from './routes/demoRoutes';

const app = express();
app.use(express.json());

app.use('/api', demoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
