import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { subtask } from "../../interfaces/subtask";
import { Task } from "../../interfaces/task";
import { SubtaskService } from "../../services/subtask.service";
import { WorkLogService } from "../../services/work-log.service";

@Component({
	selector: "app-subtask-card",
	templateUrl: "./subtask-card.component.html",
	styleUrls: ["./subtask-card.component.css"]
})
export class SubtaskCardComponent implements OnInit {
	@Input() Task!: Task;
	@Input() Subtask!: subtask;
	@Output() deleted = new EventEmitter<subtask>();
	@Output() workLogged = new EventEmitter<void>();

	WorkModalVisible: boolean = false;
	ModalId: number | undefined = 0;

	constructor(
		private SubtaskService: SubtaskService,
		private WorkLogService: WorkLogService
	) {}

	ngOnInit(): void {}

	delete(subtask: subtask): void {
		this.WorkLogService.DeleteAllWorkLogs(subtask.id);
		this.SubtaskService.deleteSubTask(subtask.id);
	}

	handleDelete(subtask: subtask) {
		this.delete(subtask);
		this.deleted.emit(subtask);
		this.workLogged.emit();
	}

	revealWorkModal(id: number | undefined): void {
		this.WorkModalVisible = !this.WorkModalVisible;
		this.setModalId(id);
	}

	setModalId(id: number | undefined): void {
		this.ModalId = id;
	}

	updateTask(updatedSubtask: subtask): void {
		this.Subtask.percentage_complete = updatedSubtask.percentage_complete;
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
