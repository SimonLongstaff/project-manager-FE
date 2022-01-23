import { Component, Input, OnInit } from "@angular/core";
import { Task } from "src/app/interfaces/task";
import { subtask } from "./../../interfaces/subtask";

@Component({
	selector: "app-subtask-table",
	templateUrl: "./subtask-table.component.html",
	styleUrls: ["./subtask-table.component.css"]
})
export class SubtaskTableComponent implements OnInit {
	@Input() task!: Task;
	@Input() subtasks: subtask[] = [];
	@Input() delete!: (args: any) => void;

	WorkModalVisible: boolean = false;

	constructor() {}

	ngOnInit(): void {}

	revealWorkModal(): void {
		this.WorkModalVisible = !this.WorkModalVisible;
	}

	updateTask(updatedSubtask: subtask): void {
		this.subtasks.forEach(subtask => {
			if (subtask.id === updatedSubtask.id) {
				subtask.percentage_complete = updatedSubtask.percentage_complete;
			}
		});
		this.revealWorkModal();
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
