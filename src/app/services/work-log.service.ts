import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Work_Log } from "../interfaces/work_log";

@Injectable({
	providedIn: "root"
})
export class WorkLogService {
	private apiUrl: string = "http://localhost:3000/work-log";

	constructor(private http: HttpClient) {}

	GetAllWorkLogs(): Observable<Work_Log[]> {
		return this.http.get<Work_Log[]>(this.apiUrl);
	}

	CreateNewWorkLog(
		subtaskId: number,
		date: Date,
		time: number,
		percentage: number
	): Observable<Work_Log> {
		let newLog = {
			subtask_id: subtaskId,
			date: date.toISOString(),
			time_spent: time,
			percentage_done: Number(percentage)
		};

		console.log("send value", newLog);
		return this.http.post<Work_Log>(this.apiUrl, newLog);
	}
}
