import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Task } from "src/app/interfaces/task";
import { subtask } from "./../../interfaces/subtask";
import { TaskService } from "./../../services/task.service";
import { SubtaskService } from "./../../services/subtask.service";
import { WorkLogService } from "./../../services/work-log.service";

@Component({
	selector: "app-subtask-table",
	templateUrl: "./subtask-table.component.html",
	styleUrls: ["./subtask-table.component.css"]
})
export class SubtaskTableComponent implements OnInit {
	@Input() task!: Task;
	@Output() subtaskDeleted = new EventEmitter<Task>();
	@Output() workLogged = new EventEmitter<void>();

	@Input() subtasks: subtask[] = [];

	WorkModalVisible: boolean = false;
	ModalId: number | undefined = 0;

	constructor(
		private TaskService: TaskService,
		private SubtaskService: SubtaskService,
		private WorkLogService: WorkLogService
	) {}

	ngOnInit(): void {}

	delete(subtask: subtask): void {
		this.WorkLogService.DeleteAllWorkLogs(subtask.id);
		this.SubtaskService.deleteSubTask(subtask.id);

		this.subtasks.forEach((feSubtask, index) => {
			if (feSubtask.id == subtask.id) {
				this.subtasks.splice(index, 1);
			}
		});

		this.workLogged.emit();
	}

	revealWorkModal(id: number | undefined): void {
		this.WorkModalVisible = !this.WorkModalVisible;
		this.setModalId(id);
	}

	setModalId(id: number | undefined): void {
		this.ModalId = id;
	}

	handleWorkLogged(): void {
		this.workLogged.emit();
	}

	updateTask(updatedSubtask: subtask): void {
		let counter: number = 0;
		let percentageAccumulator: number = 0;
		let percentage: number = 0;

		this.subtasks.forEach(subtask => {
			if (subtask.id === updatedSubtask.id) {
				subtask.percentage_complete = updatedSubtask.percentage_complete;
			}
			counter += Number(subtask.complexity);
			percentageAccumulator +=
				Number(subtask.percentage_complete) * Number(subtask.complexity);
		});

		if (counter !== 0) {
			percentage = Number((percentageAccumulator / counter).toPrecision(1));
		}

		this.TaskService.updateTaskPercentage(this.task.id, percentage);
		this.revealWorkModal(undefined);
	}

	getComplexityString(complexityValue: number): string {
		switch (complexityValue) {
			case 1:
				return "Trivial";
			case 2:
				return "Standard";
			case 5:
				return "Complex";
			case 8:
				return "Highly Complex";
			default:
				return "Error";
		}
	}
}
