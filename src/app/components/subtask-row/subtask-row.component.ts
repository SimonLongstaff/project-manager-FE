import { Component, Input, OnInit } from '@angular/core';
import { subtask } from '../../interfaces/subtask';

@Component({
  selector: 'app-subtask-row',
  templateUrl: './subtask-row.component.html',
  styleUrls: ['./subtask-row.component.css']
})
export class SubtaskRowComponent implements OnInit {

  @Input() subtask: subtask | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
