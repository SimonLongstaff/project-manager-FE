import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild
} from "@angular/core";
import { subtask } from "src/app/interfaces/subtask";
import { Task } from "src/app/interfaces/task";
import { SubtaskService } from "./../../services/subtask.service";

@Component({
	selector: "app-new-subtask-modal",
	templateUrl: "./new-subtask-modal.component.html",
	styleUrls: ["./new-subtask-modal.component.css"]
})
export class NewSubtaskModalComponent implements OnInit {
	@Input() task: Task | undefined;
	@Input() subtasks: subtask[] = [];

	@ViewChild("name") name: ElementRef | undefined;
	@ViewChild("desc") desc: ElementRef | undefined;
	@ViewChild("complexity") complexity: ElementRef | undefined;

	@Output() close = new EventEmitter<void>();
	@Output() addedTask = new EventEmitter<subtask>();

	constructor(private SubtaskService: SubtaskService) {}

	ngOnInit(): void {}

	handleClose(): void {
		this.close.emit();
	}

	addSubTask(): void {
		console.log(this.complexity?.nativeElement.value);
		if (
			this.name?.nativeElement.value != "" &&
			this.desc?.nativeElement.value != "" &&
			this.task?.id
		) {
			this.SubtaskService.createNewSubTask(
				this.task?.id,
				this.name?.nativeElement.value,
				this.desc?.nativeElement.value,
				this.complexity?.nativeElement.value
			).subscribe(subtask => {
				this.subtasks.push(subtask);
				this.addedTask.emit();
			});
		}
	}
}
