import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild
} from "@angular/core";
import { subtask } from "./../../interfaces/subtask";
import { SubtaskService } from "./../../services/subtask.service";
import { WorkLogService } from "./../../services/work-log.service";

@Component({
	selector: "app-work-done-modal",
	templateUrl: "./work-done-modal.component.html",
	styleUrls: ["./work-done-modal.component.css"]
})
export class WorkDoneModalComponent implements OnInit {
	@Input() subtask!: subtask;

	@Output() close = new EventEmitter<void>();
	@Output() taskUpdate = new EventEmitter<subtask>();

	@ViewChild("date") date!: ElementRef;
	@ViewChild("hours") hours!: ElementRef;
	@ViewChild("minutes") minutes!: ElementRef;
	@ViewChild("percentage")
	percentage!: ElementRef;
	@ViewChild("percentageDone") percentageDone!: ElementRef;

	constructor(
		private SubtaskService: SubtaskService,
		private WorkLogService: WorkLogService
	) {}

	ngOnInit(): void {}

	handleClose(): void {
		this.close.emit();
	}

	onPercentUpdate(): void {
		if (this.percentageDone) {
			this.percentageDone.nativeElement.value = this.setPercentageDone();
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
		let hourToMin = Number(this.hours.nativeElement.value) * 60;
		let min = Number(this.minutes.nativeElement.value);
		return hourToMin + min;
	}

	getDate(): Date {
		return new Date(this.date.nativeElement.value);
	}

	updateWorkDone(): void {
		if (!this.subtask.id) {
			return;
		}

		console.log("DATE", this.getDate());

		this.WorkLogService.CreateNewWorkLog(
			this.subtask?.id,
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
