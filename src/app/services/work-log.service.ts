import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Work_Log } from "../interfaces/work_log";

@Injectable({
	providedIn: "root"
})
export class WorkLogService {
	private apiUrl: string =
		window.location.protocol +
		"//" +
		window.location.hostname +
		":3000/work-log";

	constructor(private http: HttpClient) {}

	GetAllWorkLogs(): Observable<Work_Log[]> {
		return this.http.get<Work_Log[]>(this.apiUrl);
	}

	GetBySubtaskID(id: number): Observable<Work_Log[]> {
		return this.http.get<Work_Log[]>(this.apiUrl + "/subtask_id=" + id);
	}

	GetByProjectID(id: number): Observable<Work_Log[]> {
		return this.http.get<Work_Log[]>(this.apiUrl + "/project_id=" + id);
	}

	CreateNewWorkLog(
		subtaskId: number,
		projectId: number,
		date: Date,
		time: number,
		percentage: number
	): Observable<Work_Log> {
		let newLog = {
			subtask_id: subtaskId,
			project_id: projectId,
			date: date.toISOString(),
			time_spent: time,
			percentage_done: Number(percentage)
		};

		return this.http.post<Work_Log>(this.apiUrl, newLog);
	}

	DeleteWorkLog(id: number): void {
		this.http.delete(this.apiUrl + "/" + id);
	}

	DeleteAllWorkLogs(subtaskID: number): void {
		this.http.delete(this.apiUrl + "/subtask_id=" + subtaskID).subscribe({
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
