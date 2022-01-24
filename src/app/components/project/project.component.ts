import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";

import { Project } from "src/app/interfaces/Project";
import { Task } from "../../interfaces/task";
import { subtask } from "../../interfaces/subtask";
import { TaskService } from "./../../services/task.service";

@Component({
	selector: "app-project",
	templateUrl: "./project.component.html",
	styleUrls: ["./project.component.css"]
})
export class ProjectComponent implements OnInit {
	@Input() project!: Project;
	tasks: Task[] = [];

	@ViewChild("taskName") name: ElementRef | undefined;
	@ViewChild("taskDesc") desc: ElementRef | undefined;
	@ViewChild("addButton") addButton: ElementRef | undefined;
	@ViewChild("addForm") addForm: ElementRef | undefined;

	constructor(private TaskService: TaskService) {}

	ngOnInit(): void {
		this.TaskService.getAllTasksByProjectId(this.project.id).subscribe(
			tasks => {
				this.tasks = tasks;
			}
		);
	}

	addNewTask(): void {
		if (
			this.name?.nativeElement.value != "" &&
			this.desc?.nativeElement.value != "" &&
			this.project?.id
		) {
			this.TaskService.createNewTask(
				this.project.id,
				this.name?.nativeElement.value,
				this.desc?.nativeElement.value
			).subscribe(task => {
				this.tasks.push(task);
				this.addForm?.nativeElement.classList.add("hidden");
			});
		}
	}

	RevealForm(): void {
		this.addButton?.nativeElement.classList.add("hidden");
		this.addForm?.nativeElement.classList.remove("hidden");
	}

	HideForm(): void {
		this.addForm?.nativeElement.classList.add("hidden");
		this.addButton?.nativeElement.classList.remove("hidden");
	}
}
