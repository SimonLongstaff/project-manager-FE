import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../interfaces/Project";
import {Task} from "../../interfaces/task";
import { subtask } from '../../interfaces/subtask';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input() project: Project | undefined;
  @Input() task: Task | undefined;
  @Input() subtasks: subtask[] = [];

  hidden: string = 'hidden';

  constructor() { }



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
