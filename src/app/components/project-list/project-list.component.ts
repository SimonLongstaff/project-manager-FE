import { Component, Input, OnInit } from "@angular/core";
import { subtask } from "src/app/interfaces/subtask";
import { Project } from "../../interfaces/Project";
import { Task } from "../../interfaces/task";
import { ProjectService } from "./../../services/project.service";

@Component({
	selector: "app-project-list",
	templateUrl: "./project-list.component.html",
	styleUrls: ["./project-list.component.css"]
})
export class ProjectListComponent implements OnInit {
	projects: Project[] = [];

	AddNewProject: boolean = false;
  AddNewTag: boolean = false;

	constructor(private ProjectService: ProjectService) {}

	ngOnInit(): void {
		this.ProjectService.getProjects().subscribe(projects => {
			this.projects = projects;
		});
	}

  handleDelete(deletedProject: Project){
    this.projects.forEach((project, index) => {
      if (project.id === deletedProject.id){
        this.projects.splice(index, 1);
      }
    })
  }

	ShowAddNewModal(state: boolean): void {
		this.AddNewProject = state;
	}

  RevealNewTagModal(): void {
    this.AddNewTag = !this.AddNewTag;
  }
}
