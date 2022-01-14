import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { Project } from 'src/app/interfaces/Project';
import { subtask } from 'src/app/interfaces/subtask';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() project: Project | undefined;
  @Input() tasks: Task[] =[];
  @Input() subtasks: subtask[] = []

  constructor() { }

  ngOnInit(): void {
  }

  filterTask(): Task[]{

    let filterTasks:Task[] = []

    for(let task of this.tasks){
      if(task.project_id === this.project?.id){
        filterTasks.push(task)
      }
    }
    return filterTasks;
  }

}
