import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { subtask } from "../interfaces/subtask";

@Injectable({
	providedIn: "root"
})
export class SubtaskService {
	private apiUrl: string =
		window.location.protocol +
		"//" +
		window.location.hostname +
		":3000/subtasks";

	constructor(private http: HttpClient) {}

	getAllSubTasks(): Observable<subtask[]> {
		return this.http.get<subtask[]>(this.apiUrl);
	}

	getAllSubTaskByTaskID(taskId: number) {
		return this.http.get<subtask[]>(this.apiUrl + "/taskId=" + taskId);
	}

	createNewSubTask(
		taskId: number,
		name: string,
		desc: string,
		complexity: number
	): Observable<subtask> {
		let newSubtask = {
			task_id: taskId,
			subtask_name: name,
			subtask_desc: desc,
			is_complete: 0,
			percentage_complete: 0,
			complexity: complexity
		};

		return this.http.post<subtask>(this.apiUrl, newSubtask);
	}

	updateCompletion(id: number, percentage: number): Observable<subtask> {
		let patchUrl = this.apiUrl + "/" + id;
		let updateValue = { percentage_complete: percentage };

		return this.http.patch<subtask>(patchUrl, updateValue);
	}

	deleteSubTask(taskId: number): void {
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
}
