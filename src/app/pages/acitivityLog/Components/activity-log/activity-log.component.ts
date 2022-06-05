import { Component, Input, OnInit } from "@angular/core";
import { Work_Log } from "../../../../interfaces/work_log";
import { Project } from "../../../../interfaces/Project";
import { ProjectService } from "../../../../services/project.service";
import { TaskService } from "../../../../services/task.service";
import { SubtaskService } from "../../../../services/subtask.service";
import { subtask } from "../../../../interfaces/subtask";
import { Task } from "../../../../interfaces/task";

@Component({
	selector: "app-activity-log",
	templateUrl: "./activity-log.component.html",
	styleUrls: ["./activity-log.component.css"]
})
export class ActivityLogComponent implements OnInit {
	@Input() workLog!: Work_Log;
	project: Project | undefined;
	task: Task | undefined;
	subtask: subtask | undefined;

	constructor(
		private ProjectService: ProjectService,
		private TaskService: TaskService,
		private SubTaskService: SubtaskService
	) {}

	ngOnInit(): void {
		console.log(this.workLog);
		if (this.workLog?.project_id) {
			this.ProjectService.getProject(this.workLog.project_id).subscribe(
				project => {
					this.project = project;
				}
			);
		}

		this.SubTaskService.getSubTask(this.workLog.subtask_id).subscribe(
			subtask => {
				this.subtask = subtask;
				this.TaskService.getTaskById(subtask.task_id).subscribe(task => {
					this.task = task;
				});
			}
		);
	}

	ReadableDateAndTime(date: Date): string {
		return new Date(date).toLocaleString("en-US", {
			day: "2-digit",
			month: "short",
			hour: "numeric",
			minute: "numeric",
			hour12: true
		});
	}
}
