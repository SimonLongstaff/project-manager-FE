import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import { Project } from 'src/app/interfaces/Project';
import {Task} from "../../interfaces/task";
import { subtask } from '../../interfaces/subtask';
import { TaskService } from './../../services/task.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() project: Project | undefined;
  @Input() tasks: Task[] = [];
  @Input() subtasks: subtask[] = [];

  @ViewChild('taskName') name: ElementRef | undefined
  @ViewChild('taskDesc') desc: ElementRef | undefined;

  constructor(private TaskService: TaskService) { }

  ngOnInit(): void {
  }

  addNewTask(): void {
    if(this.name?.nativeElement.value != '' && this.desc?.nativeElement.value != '' && this.project?.id){
      this.TaskService.createNewTask(this.project.id, this.name?.nativeElement.value, this.desc?.nativeElement.value)
      .subscribe((task) => (this.tasks.push(task)))
    }
  }

}
