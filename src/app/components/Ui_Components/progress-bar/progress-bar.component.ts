import { Component, Input, OnInit } from "@angular/core";
import { Task } from "src/app/interfaces/task";
import { TaskService } from "./../../../services/task.service";

@Component({
	selector: "app-progress-bar",
	templateUrl: "./progress-bar.component.html",
	styleUrls: ["./progress-bar.component.css"]
})
export class ProgressBarComponent implements OnInit {
	@Input() Task: Task | undefined;

	constructor() {}

	ngOnInit() {}

	getColour(): string {
		if (!this.Task) {
			return "progress-red";
		}
		if (this.Task.percentage_complete < 20) {
			return "progress-red";
		}
		if (this.Task.percentage_complete > 80) {
			return "progress-green";
		} else return "progress-yellow";
	}
}
