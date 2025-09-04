import { Request, Response } from 'express';
import { Project, IProject } from '../models/Project';
import { Team } from '../models/Team';
import { page, ok } from '../utils/apiResponse';
import { AppError } from '../utils/AppError';


async function assertMembersExist(ids: string[]) {
if (!ids || ids.length === 0) return;
const cnt = await Team.countDocuments({ _id: { $in: ids } });
if (cnt !== ids.length) throw new AppError(400, 'One or more team members do not exist');
}


export async function listProjects(req: Request, res: Response) {
const { page: p = 1, limit: l = 10, search } = req.query as any;
const pageNum = Number(p);
const limitNum = Number(l);
const skip = (pageNum - 1) * limitNum;


const filter: any = {};
if (search) {
const regex = new RegExp(search as string, 'i');
filter.$or = [{ name: regex }, { description: regex }];
}


const [items, total] = await Promise.all([
Project.find(filter).populate('teamMembers').skip(skip).limit(limitNum).lean<IProject[]>(),
Project.countDocuments(filter),
]);


return res.json(
page<IProject>({ data: items, page: pageNum, limit: limitNum, totalItems: total, totalPages: Math.ceil(total / limitNum) })
);
}


export async function createProject(req: Request, res: Response) {
const { teamMembers } = req.body as { teamMembers?: string[] };
await assertMembersExist(teamMembers ?? []);
const project = await Project.create(req.body);
return res.status(201).json(ok(project));
}


export async function updateProject(req: Request, res: Response) {
const { id } = req.params as { id: string };
const { teamMembers } = req.body as { teamMembers?: string[] };
if (teamMembers) await assertMembersExist(teamMembers);


const updated = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).populate('teamMembers');
if (!updated) return res.status(404).json({ success: false, message: 'Project not found' });
return res.json(ok(updated));
}


export async function deleteProject(req: Request, res: Response) {
const { id } = req.params as { id: string };
const deleted = await Project.findByIdAndDelete(id);
if (!deleted) return res.status(404).json({ success: false, message: 'Project not found' });
return res.status(204).send();
}