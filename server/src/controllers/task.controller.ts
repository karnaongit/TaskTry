// src/controllers/task.controller.ts
import { Request, Response } from 'express';
import {Task} from '../models/Task';
import {Project} from '../models/Project';
import {Team} from '../models/Team';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { project, assignedMembers } = req.body;

    // ✅ Ensure project exists
    const existingProject = await Project.findById(project);
    if (!existingProject) return res.status(400).json({ message: 'Invalid project ID' });

    // ✅ Ensure members exist
    const members = await Team.find({ _id: { $in: assignedMembers } });
    if (members.length !== assignedMembers.length) {
      return res.status(400).json({ message: 'One or more assigned members are invalid' });
    }

    // ✅ Ensure members belong to the project
    const invalidMembers = assignedMembers.filter(
      (m: string) => !existingProject.teamMembers.map((tm) => tm.toString()).includes(m.toString())
    );
    if (invalidMembers.length > 0) {
      return res.status(400).json({ message: 'Some assigned members are not part of the project' });
    }

    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const listTasks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, project, member, status, search, startDate, endDate } = req.query as any;

    const filter: any = {};
    if (project) filter.project = project;
    if (member) filter.assignedMembers = member;
    if (status) filter.status = status;
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
    if (startDate || endDate) {
      filter.deadline = {};
      if (startDate) filter.deadline.$gte = new Date(startDate);
      if (endDate) filter.deadline.$lte = new Date(endDate);
    }

    const tasks = await Task.find(filter)
      .populate('project')
      .populate('assignedMembers')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Task.countDocuments(filter);
    res.json({ data: tasks, total });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
