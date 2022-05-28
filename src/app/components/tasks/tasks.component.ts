import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild
} from "@angular/core";
import { Project } from "../../interfaces/Project";
import { Task } from "../../interfaces/task";
import { subtask } from "../../interfaces/subtask";
import { SubtaskService } from "./../../services/subtask.service";
import { WorkLogService } from "./../../services/work-log.service";
import { TaskService } from "./../../services/task.service";

@Component({
	selector: "app-tasks",
	templateUrl: "./tasks.component.html",
	styleUrls: ["./tasks.component.css"]
})
export class TasksComponent implements OnInit {
	@Input() project!: Project;
	@Input() task!: Task;
	subtasks: subtask[] = [];

	@Output() delete = new EventEmitter<Task>();

	@ViewChild("name") name!: ElementRef;
	@ViewChild("desc") desc!: ElementRef;
	@ViewChild("subtaskButton") subtaskButton!: ElementRef;
	@ViewChild("subtaskForm") subtaskForm!: ElementRef;

	detailsRevealed: boolean = false;
	addSubtask: boolean = false;

	constructor(
		private SubtaskService: SubtaskService,
		private TaskService: TaskService,
		private WorkLogService: WorkLogService
	) {}

	ngOnInit(): void {
		this.SubtaskService.getAllSubTaskByTaskID(this.task.id).subscribe(
			subtasks => {
				this.subtasks = subtasks;
			}
		);
	}

	handleSubTaskDeletion(deleteSubtask: subtask): void {
		this.subtasks.forEach(subtask => {
			if (subtask.id == deleteSubtask.id) {
				this.subtasks.splice(this.subtasks.indexOf(subtask), 1);
			}
		});
	}

	DeleteTask(): void {
		this.TaskService.deleteTask(this.task.id);
		this.delete.emit(this.task);
		this.UpdatePercentage();
	}

	UpdatePercentage(): void {
		let counter: number = 0;
		let percentageAccumulator: number = 0;
		let percentage: number = 0;

		this.subtasks.forEach(subtask => {
			counter += Number(subtask.complexity);
			percentageAccumulator +=
				Number(subtask.percentage_complete) * Number(subtask.complexity);
		});

		if (counter !== 0) {
			percentage = Number((percentageAccumulator / counter).toPrecision(1));
		}

		this.TaskService.updateTaskPercentage(this.task.id, percentage).subscribe(
			task => {
				console.log(task);
				this.task.percentage_complete = percentage;
				this.RevealModal(false);
			}
		);
	}

	RevealDetails(): void {
		this.detailsRevealed = !this.detailsRevealed;
	}

	RevealModal(value: boolean): void {
		this.addSubtask = value;
	}
}
