import { Component, Input, OnInit } from "@angular/core";
import { Project } from "../../interfaces/Project";
import { ProjectService } from "../../services/project.service";
import { Tag } from "../../interfaces/tag";
import { TagsService } from "../../services/tags.service";

@Component({
	selector: "app-project-list",
	templateUrl: "./project-list.component.html",
	styleUrls: ["./project-list.component.css"]
})
export class ProjectListComponent implements OnInit {
	projects: Project[] = [];
	tags: Tag[] = [];
	filterByTag: number = 0;

	AddNewProject: boolean = false;
	AddNewTag: boolean = false;
	EditTags: boolean = false;
	selected: Tag | undefined;

	constructor(
		private ProjectService: ProjectService,
		private TagsService: TagsService
	) {}

	ngOnInit(): void {
		this.ProjectService.getProjects().subscribe(projects => {
			this.projects = projects;
		});

		this.TagsService.GetAllTags().subscribe(tags => {
			this.tags = tags;
		});
	}

	setTagFilter(): void {
		//this.filterByTag = tagId;
		console.log(this.selected);
	}

	handleDelete(deletedProject: Project) {
		this.projects.forEach((project, index) => {
			if (project.id === deletedProject.id) {
				this.projects.splice(index, 1);
			}
		});
	}

	handleArchive(archivedProject: Project) {
		this.projects.forEach((project, index) => {
			if (project.id === archivedProject.id) {
				project.is_archived = archivedProject.is_archived;
			}
		});
	}

	ShowAddNewModal(state: boolean): void {
		this.AddNewProject = state;
	}

	RevealNewTagModal(): void {
		this.AddNewTag = !this.AddNewTag;
	}

	RevealEditTagModal(): void {
		this.EditTags = !this.EditTags;
	}
}
