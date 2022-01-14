import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/Project';
import {ProjectService} from "../../services/project.service";
import {Task} from "../../interfaces/task";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-api-layer',
  templateUrl: './api-layer.component.html',
  styleUrls: ['./api-layer.component.css']
})
export class APILayerComponent implements OnInit {

  projects: Project[] = [];
  tasks: Task[] = [];

  constructor(private projectService: ProjectService, private TaskService: TaskService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => (this.projects = projects));
    this.TaskService.getAllTasks().subscribe((tasks) => (this.tasks = tasks));
  }

}
