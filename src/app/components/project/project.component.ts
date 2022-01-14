import {Component, Input, OnInit} from '@angular/core';

import { Project } from 'src/app/interfaces/Project';
import {Task} from "../../interfaces/task";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() projects: Project[] = [];
  @Input() tasks: Task[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
