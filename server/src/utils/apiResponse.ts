export interface Paginated<T> {
data: T[];
page: number;
limit: number;
totalItems: number;
totalPages: number;
}


export function ok<T>(data: T) {
return { success: true, data };
}


export function page<T>(payload: Paginated<T>) {
return { success: true, ...payload };
}