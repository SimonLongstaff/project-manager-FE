import { Component, Input, OnInit } from '@angular/core';
import { subtask } from 'src/app/interfaces/subtask';
import { Task } from 'src/app/interfaces/task';


@Component({
  selector: 'app-subtask-table',
  templateUrl: './subtask-table.component.html',
  styleUrls: ['./subtask-table.component.css']
})
export class SubtaskTableComponent implements OnInit {

  @Input() task!: Task;
  @Input() subtasks: subtask[] = [];
  @Input() delete!: (args: any) => void;

  constructor() {}

  ngOnInit(): void {

  }

}
