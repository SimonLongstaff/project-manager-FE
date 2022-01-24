export interface Task {
	id: number;
	project_id: number;
	task_name: string;
	task_desc: string;
	is_complete: boolean;
	percentage_complete: number;
	tag_id?: number;
}
