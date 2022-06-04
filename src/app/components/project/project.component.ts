import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild
} from "@angular/core";

import { Project } from "src/app/interfaces/Project";
import { Task } from "../../interfaces/task";
import { TaskService } from "../../services/task.service";
import { Tag } from "../../interfaces/tag";
import { TagsService } from "../../services/tags.service";
import { ProjectService } from "../../services/project.service";
import { WorkLogService } from "../../services/work-log.service";
import { Work_Log } from "../../interfaces/work_log";

@Component({
	selector: "app-project",
	templateUrl: "./project.component.html",
	styleUrls: ["./project.component.css"]
})
export class ProjectComponent implements OnInit {
	@Input() project!: Project;
	tasks: Task[] = [];
	worklog: Work_Log[] = [];
	tag: Tag | undefined;

	@Output() delete = new EventEmitter<Project>();
	@Output() archived = new EventEmitter<Project>();

	@ViewChild("taskName") name: ElementRef | undefined;
	@ViewChild("taskDesc") desc: ElementRef | undefined;
	@ViewChild("addButton") addButton: ElementRef | undefined;
	@ViewChild("addForm") addForm: ElementRef | undefined;

	editProject: boolean = false;

	constructor(
		private TaskService: TaskService,
		private TagService: TagsService,
		private ProjectService: ProjectService,
		private WorklogService: WorkLogService
	) {}

	ngOnInit(): void {
		this.TaskService.getAllTasksByProjectId(this.project.id).subscribe(
			tasks => {
				this.tasks = tasks;
				console.log(this.tasks);
			}
		);

		this.WorklogService.GetByProjectID(this.project.id).subscribe(worklog => {
			this.worklog = worklog;
			console.log(this.worklog);
		});

		if (this.project.tag_id != null) {
			this.TagService.GetTag(this.project.tag_id).subscribe(tag => {
				this.tag = tag;
			});
		}
	}

	updateProject(project: Project): void {
		this.ProjectService.getProject(this.project.id).subscribe(project => {
			this.project = project;
			this.editProject = false;
		});
	}

	DeleteProject(): void {
		this.ProjectService.DeleteProject(this.project.id);
		this.delete.emit(this.project);
	}

	ArchiveProject(): void {
		this.ProjectService.ArchiveProject(this.project.id, true).subscribe(
			project => {
				this.project = project;
				this.archived.emit(this.project);
			}
		);
	}

	GetTimeSpent(): number {
		let time = 0;
		this.worklog.forEach(log => {
			time += log.time_spent;
		});

		return time;
	}

	ConvertMinutesToHours(minutes: number): string {
		let hours = Math.floor(minutes / 60);
		let minutesLeft = minutes % 60;

		return `${hours}h ${minutesLeft}m`;
	}

	ConvertMinutesToDaysandHours(minutes: number): string {
		let days = Math.floor(minutes / 1440);
		let hours = Math.floor((minutes % 1440) / 60);
		let minutesLeft = minutes % 60;

		return `${days}d ${hours}h ${minutesLeft}m`;
	}

	AddNewTask(): void {
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

	EditProject() {
		this.editProject = true;
	}
}
