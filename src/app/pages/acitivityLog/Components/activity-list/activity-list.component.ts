import { Component, OnInit } from "@angular/core";
import { WorkLogService } from "../../../../services/work-log.service";
import { Work_Log } from "../../../../interfaces/work_log";

@Component({
	selector: "app-activity-list",
	templateUrl: "./activity-list.component.html",
	styleUrls: ["./activity-list.component.css"]
})
export class ActivityListComponent implements OnInit {
	WorkLogs: Work_Log[] = [];

	constructor(private WorkLogService: WorkLogService) {}

	ngOnInit(): void {
		this.WorkLogService.GetAllWorkLogs().subscribe(workLogs => {
			this.WorkLogs = workLogs;
			this.WorkLogs.sort((a, b) => {
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			});
		});
	}
}
