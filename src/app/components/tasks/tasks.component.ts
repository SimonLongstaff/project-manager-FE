import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../interfaces/Project";
import {Task} from "../../interfaces/task";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input() project: Project | undefined;
  @Input() tasks: Task[] = [];
  hidden: string = 'hidden';

  constructor() { }

  filterTask(): Task[]{

    let filterTasks:Task[] = []

    for(let task of this.tasks){
      if(task.project_id === this.project?.id){
        filterTasks.push(task)
      }
    }
    return filterTasks;
  }

  toggle(): void
  {
    if(this.hidden === 'hidden'){
      this.hidden = ''
    }
    else{
      this.hidden ='hidden'
    }

  }


  ngOnInit(): void {

  }


}
