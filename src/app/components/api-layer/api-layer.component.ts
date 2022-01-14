import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/Project';
import {ProjectService} from "../../services/project.service";
import {Task} from "../../interfaces/task";
import {TaskService} from "../../services/task.service";
import { subtask } from 'src/app/interfaces/subtask';
import { SubtaskService } from '../../services/subtask.service';

@Component({
  selector: 'app-api-layer',
  templateUrl: './api-layer.component.html',
  styleUrls: ['./api-layer.component.css']
})
export class APILayerComponent implements OnInit {

  projects: Project[] = [];
  tasks: Task[] = [];
  subtasks: subtask[] = [];

  constructor(
    private projectService: ProjectService,
     private TaskService: TaskService,
     private SubtaskService: SubtaskService
     ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => (this.projects = projects));
    this.TaskService.getAllTasks().subscribe((tasks) => (this.tasks = tasks));
    this.SubtaskService.getAllSubTaks().subscribe((subtasks) => (this.subtasks = subtasks))
  }

}
