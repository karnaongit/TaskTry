import { Router } from 'express';
import { createTeam, deleteTeam, listTeams, updateTeam } from '../controllers/team.controller';
import { validate } from '../middleware/validate';
import { createTeamSchema, updateTeamRequestSchema, paginationQuerySchema } from '../validation/team.schemas';

const router = Router();

router.get('/', validate(paginationQuerySchema, 'query'), listTeams);
router.post('/', validate(createTeamSchema, 'body'), createTeam);
router.put('/:id', validate(updateTeamRequestSchema), updateTeam);
router.delete('/:id', validate(updateTeamRequestSchema), deleteTeam);

export default router;
