import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild
} from "@angular/core";
import { subtask } from "../../../interfaces/subtask";
import { SubtaskService } from "../../../services/subtask.service";
import { WorkLogService } from "../../../services/work-log.service";
import { TaskService } from "../../../services/task.service";

@Component({
	selector: "app-work-done-modal",
	templateUrl: "./work-done-modal.component.html",
	styleUrls: ["./work-done-modal.component.css"]
})
export class WorkDoneModalComponent implements OnInit {
	@Input() subtask!: subtask;
	projectId: number = 0;

	@Output() close = new EventEmitter<void>();
	@Output() taskUpdate = new EventEmitter<subtask>();

	@ViewChild("date") date!: ElementRef;
	@ViewChild("hours") hours!: ElementRef;
	@ViewChild("minutes") minutes!: ElementRef;
	@ViewChild("timeFieldInput") timeField!: ElementRef;
	@ViewChild("percentage")
	percentage!: ElementRef;
	@ViewChild("percentageDone") percentageDone!: ElementRef;

	constructor(
		private SubtaskService: SubtaskService,
		private WorkLogService: WorkLogService,
		private TaskService: TaskService
	) {}

	ngOnInit(): void {
		this.TaskService.getTaskById(this.subtask.task_id).subscribe(task => {
			this.projectId = task.project_id;
		});
	}

	handleClose(): void {
		this.close.emit();
	}

	onPercentUpdate(): void {
		if (this.percentageDone) {
			this.percentageDone.nativeElement.value = this.setPercentageDone();
		}
	}

	ValidateTimeString(time: string): boolean {
		return RegExp("([0-9]*[hH] )?([0-9]*[mM])|([0-9]*[hH])$").test(time);
	}

	convertTimeString(time: string): string {
		console.log(time);
		try {
			let timeArray = time.split(" ");
			let hours = timeArray[0].split("h")[0];
			let minutes = timeArray[1].split("m")[0];
			console.log(hours, minutes);
			// @ts-ignore
			return Number(hours * 60 + Number(minutes));
		} catch (e) {
			let minutes = time.split("m")[0];
			console.log(minutes);
			return minutes;
		}
	}

	updateBox(input: string): void {
		if (this.ValidateTimeString(input)) {
			console.log(input, this.ValidateTimeString(input));
			this.timeField.nativeElement.classList.remove("is-invalid");
			this.timeField.nativeElement.classList.add("is-valid");
		} else {
			this.timeField.nativeElement.classList.remove("is-valid");
			this.timeField.nativeElement.classList.add("is-invalid");
		}
	}

	setPercentageDone(): number {
		if (this.percentage.nativeElement.value) {
			return (
				Number(this.percentage.nativeElement.value) +
				Number(this.subtask?.percentage_complete)
			);
		} else {
			return Number(this.subtask?.percentage_complete);
		}
	}

	calculateTime(): number {
		let time = this.convertTimeString(this.timeField.nativeElement.value + " ");
		console.log(time);
		return Number(time);
	}

	getDate(): Date {
		return new Date();
	}

	updateWorkDone(): void {
		if (!this.subtask.id) {
			return;
		}

		if (!this.ValidateTimeString(this.timeField.nativeElement.value)) {
			this.timeField.nativeElement.classList.add("is-invalid-flashing");
			setTimeout(() => {
				this.timeField.nativeElement.classList.remove("is-invalid-flashing");
			}, 1000);
			return;
		}

		console.log("DATE", this.getDate());

		this.WorkLogService.CreateNewWorkLog(
			this.subtask?.id,
			this.projectId,
			this.getDate(),
			this.calculateTime(),
			this.percentage.nativeElement.value
		).subscribe(work => {
			console.log(work);
		});

		this.SubtaskService.updateCompletion(
			this.subtask.id,
			this.percentageDone.nativeElement.value
		).subscribe(subtask => {
			this.taskUpdate.emit(subtask);
		});
	}
}
