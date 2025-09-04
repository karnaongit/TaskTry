import { Router } from 'express';
import { createProject, deleteProject, listProjects, updateProject } from '../controllers/project.controller';
import { validate } from '../middleware/validate';
import { createProjectSchema, updateProjectRequestSchema, paginationQuerySchema } from '../validation/project.schemas';

const router = Router();

router.get('/', validate(paginationQuerySchema, 'query'), listProjects);
router.post('/', validate(createProjectSchema, 'body'), createProject);
router.put('/:id', validate(updateProjectRequestSchema), updateProject);
router.delete('/:id', validate(updateProjectRequestSchema), deleteProject);

export default router;
