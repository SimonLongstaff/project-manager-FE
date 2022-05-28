import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Task } from "../interfaces/task";

@Injectable({
	providedIn: "root"
})
export class TaskService {
	private apiUrl: string =
		window.location.protocol + "//" + window.location.hostname + ":3000/tasks";

	constructor(private http: HttpClient) {}

	getAllTasks(): Observable<Task[]> {
		return this.http.get<Task[]>(this.apiUrl);
	}

	getAllTasksByProjectId(id: number): Observable<Task[]> {
		return this.http.get<Task[]>(this.apiUrl + "/project_id=" + id);
	}

	getTaskById(id: number): Observable<Task> {
		return this.http.get<Task>(this.apiUrl + "/" + id);
	}

	createNewTask(
		projectId: number,
		taskName: string,
		taskDesc: string
	): Observable<Task> {
		let newTask = {
			project_id: projectId,
			task_name: taskName,
			task_desc: taskDesc,
			is_complete: 0,
			percentage_complete: 0
		};

		return this.http.post<Task>(this.apiUrl, newTask);
	}

	deleteTask(taskId: number): void {
		this.http.delete(this.apiUrl + "/" + taskId).subscribe({
			next: data => {
				return true;
			},
			error: error => {
				console.log(error);
				return false;
			}
		});
	}

	updateTaskPercentage(id: number, percent: number): Observable<Task> {
		return this.http.put<Task>(this.apiUrl + "/" + id, {
			percentage_complete: percent
		});
	}
}
