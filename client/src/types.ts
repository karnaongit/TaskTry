export interface Team {
_id: string;
name: string;
email: string;
designation: string;
}


export interface Project {
_id: string;
name: string;
description: string;
teamMembers: Team[] | string[];
}


export type TaskStatus = 'to-do' | 'in-progress' | 'done' | 'cancelled';


export interface Task {
_id: string;
title: string;
description: string;
deadline: string; // ISO
project: Project | string;
assignedMembers: Team[] | string[];
status: TaskStatus;
}


export interface PaginatedResponse<T> {
success: boolean;
data: T[];
page: number;
limit: number;
totalItems: number;
totalPages: number;
}