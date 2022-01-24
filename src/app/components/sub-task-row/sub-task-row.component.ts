import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { subtask } from "src/app/interfaces/subtask";
import { WorkLogService } from "./../../services/work-log.service";
import { SubtaskService } from "./../../services/subtask.service";
import { Task } from "src/app/interfaces/task";
import { TaskService } from "./../../services/task.service";

@Component({
	selector: "app-sub-task-row",
	templateUrl: "./sub-task-row.component.html",
	styleUrls: ["./sub-task-row.component.css"]
})
export class SubTaskRowComponent implements OnInit {
	@Input() task!: Task;
	@Input() subtask!: subtask;
	@Input() index!: number;
	@Output() delete = new EventEmitter<subtask>();
	@Output() workLogged = new EventEmitter<void>();

	WorkModalVisible: boolean = false;
	ModalId: number | undefined = 0;

	constructor() {}

	ngOnInit(): void {}

	handleDelete(subtask: subtask) {
		this.delete.emit(subtask);
	}

	getBackgroundColour(): String {
		if (this.index % 2 == 0) {
			return "even";
		} else {
			return "odd";
		}
	}

	revealWorkModal(id: number | undefined): void {
		this.WorkModalVisible = !this.WorkModalVisible;
		this.setModalId(id);
	}

	setModalId(id: number | undefined): void {
		this.ModalId = id;
	}

	updateTask(updatedSubtask: subtask): void {
		this.subtask.percentage_complete = updatedSubtask.percentage_complete;
		this.workLogged.emit();
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
