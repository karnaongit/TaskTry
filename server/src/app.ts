import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import teamRoutes from './routes/team.routes';
import projectRoutes from './routes/project.routes';
import taskRoutes from './routes/task.routes';
import { errorHandler } from './middleware/errorHandler';


const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/health', (_req, res) => res.json({ ok: true }));


app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Error handler (keep last)
app.use(errorHandler);


export default app;