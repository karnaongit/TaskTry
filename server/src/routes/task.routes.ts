import { Router } from 'express';
import { createTask, deleteTask, listTasks, updateTask } from '../controllers/task.controller';
import { validate } from '../middleware/validate';
import { createTaskSchema, updateTaskRequestSchema, taskFilterQuerySchema } from '../validation/task.schemas';

const router = Router();

router.get('/', validate(taskFilterQuerySchema, 'query'), listTasks);
router.post('/', validate(createTaskSchema, 'body'), createTask);
router.put('/:id', validate(updateTaskRequestSchema), updateTask);
router.delete('/:id', validate(updateTaskRequestSchema), deleteTask);

export default router;
