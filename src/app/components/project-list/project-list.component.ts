import { Component, Input, OnInit } from '@angular/core';
import { subtask } from 'src/app/interfaces/subtask';
import { Project } from '../../interfaces/Project';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  @Input() projects: Project[] = [];
  @Input() tasks: Task[] = [];
  @Input() subtask: subtask[] = [];

  AddNewProject: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ShowAddNewModal(state: boolean): void {
    this.AddNewProject = state;
  }
}
