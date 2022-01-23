import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Project } from "../../interfaces/Project";
import { Task } from "../../interfaces/task";
import { subtask } from "../../interfaces/subtask";
import { SubtaskService } from "./../../services/subtask.service";
import { WorkLogService } from "./../../services/work-log.service";

@Component({
	selector: "app-tasks",
	templateUrl: "./tasks.component.html",
	styleUrls: ["./tasks.component.css"]
})
export class TasksComponent implements OnInit {
	@Input() project: Project | undefined;
	@Input()
	task!: Task;
	@Input() subtasks: subtask[] = [];

	@ViewChild("name") name: ElementRef | undefined;
	@ViewChild("desc") desc: ElementRef | undefined;
	@ViewChild("subtaskButton") subtaskButton: ElementRef | undefined;
	@ViewChild("subtaskForm") subtaskForm: ElementRef | undefined;

	detailsRevealed: boolean = false;
	addSubtask: boolean = false;

	constructor(
		private SubtaskService: SubtaskService,
		private WorkLogService: WorkLogService
	) {}

	ngOnInit(): void {}

	filterSubTasks(): subtask[] {
		let retVal: subtask[] = [];

		this.subtasks.forEach(subtask => {
			if (subtask.task_id === this.task?.id) {
				retVal.push(subtask);
			}
		});

		return retVal;
	}

	RevealDetails(): void {
		this.detailsRevealed = !this.detailsRevealed;
	}

	RevealModal(value: boolean): void {
		this.addSubtask = value;
	}

	delete = (subtask: subtask): void => {
		if (subtask.id) {
			this.WorkLogService.DeleteAllWorkLogs(subtask.id);
			this.SubtaskService.deleteSubTask(subtask.id);
			this.subtasks.forEach((feSubtask, index) => {
				if (feSubtask.id == subtask.id) {
					this.subtasks.splice(index, 1);
				}
			});
		}
	};
}
