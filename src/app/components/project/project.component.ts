import {Component, Input, OnInit} from '@angular/core';

import { Project } from 'src/app/interfaces/Project';
import {Task} from "../../interfaces/task";
import { subtask } from '../../interfaces/subtask';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() project: Project | undefined;
  @Input() tasks: Task[] = [];
  @Input() subtasks: subtask[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
