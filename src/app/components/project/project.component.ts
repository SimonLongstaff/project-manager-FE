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

@Component({
	selector: "app-project",
	templateUrl: "./project.component.html",
	styleUrls: ["./project.component.css"]
})
export class ProjectComponent implements OnInit {
	@Input() project!: Project;
	tasks: Task[] = [];
	tag: Tag | undefined;

	@Output() delete = new EventEmitter<Project>();
	@Output() archived = new EventEmitter<Project>();

	@ViewChild("taskName") name: ElementRef | undefined;
	@ViewChild("taskDesc") desc: ElementRef | undefined;
	@ViewChild("addButton") addButton: ElementRef | undefined;
	@ViewChild("addForm") addForm: ElementRef | undefined;

	constructor(
		private TaskService: TaskService,
		private TagService: TagsService,
		private ProjectService: ProjectService
	) {}

	ngOnInit(): void {
		this.TaskService.getAllTasksByProjectId(this.project.id).subscribe(
			tasks => {
				this.tasks = tasks;
				console.log(this.tasks);
			}
		);

		if (this.project.tag_id != null) {
			this.TagService.GetTag(this.project.tag_id).subscribe(tag => {
				this.tag = tag;
			});
		}
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
