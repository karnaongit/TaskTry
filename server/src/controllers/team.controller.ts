import { Request, Response } from 'express';
import { Team, ITeam } from '../models/Team';
import { page, ok } from '../utils/apiResponse';


export async function listTeams(req: Request, res: Response) {
const { page: p = 1, limit: l = 10, search } = req.query as any;
const pageNum = Number(p);
const limitNum = Number(l);
const skip = (pageNum - 1) * limitNum;


const filter: any = {};
if (search) {
const regex = new RegExp(search as string, 'i');
filter.$or = [{ name: regex }, { email: regex }, { designation: regex }];
}


const [items, total] = await Promise.all([
Team.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean<ITeam[]>(),
Team.countDocuments(filter),
]);


return res.json(
page<ITeam>({ data: items, page: pageNum, limit: limitNum, totalItems: total, totalPages: Math.ceil(total / limitNum) })
);
}


export async function createTeam(req: Request, res: Response) {
const doc = await Team.create(req.body);
return res.status(201).json(ok(doc));
}


export async function updateTeam(req: Request, res: Response) {
const { id } = req.params as { id: string };
const updated = await Team.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
if (!updated) return res.status(404).json({ success: false, message: 'Team not found' });
return res.json(ok(updated));
}


export async function deleteTeam(req: Request, res: Response) {
const { id } = req.params as { id: string };
const deleted = await Team.findByIdAndDelete(id);
if (!deleted) return res.status(404).json({ success: false, message: 'Team not found' });
return res.status(204).send();
}