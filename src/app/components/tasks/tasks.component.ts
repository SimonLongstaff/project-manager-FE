import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../interfaces/Project';
import { Task } from '../../interfaces/task';
import { subtask } from '../../interfaces/subtask';
import { SubtaskService } from './../../services/subtask.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() project: Project | undefined;
  @Input()
  task!: Task;
  @Input() subtasks: subtask[] = [];

  @ViewChild('name') name: ElementRef | undefined;
  @ViewChild('desc') desc: ElementRef | undefined;
  @ViewChild('subtaskButton') subtaskButton: ElementRef | undefined;
  @ViewChild('subtaskForm') subtaskForm: ElementRef | undefined;

  hidden: string = 'hidden';

  constructor(private SubtaskService: SubtaskService) {}

  toggle(): void {
    if (this.hidden === 'hidden') {
      this.hidden = '';
    } else {
      this.hidden = 'hidden';
    }
  }

  filterSubTasks(): subtask[] {
    let retVal: subtask[] = [];

    this.subtasks.forEach((subtask) => {
      if (subtask.task_id === this.task?.id) {
        retVal.push(subtask);
      }
    });

    return retVal;
  }

  ngOnInit(): void {}

  addSubTask(): void {
    if (
      this.name?.nativeElement.value != '' &&
      this.desc?.nativeElement.value != '' &&
      this.task.id
    ) {
      this.SubtaskService.createNewSubTask(
        this.task?.id,
        this.name?.nativeElement.value,
        this.desc?.nativeElement.value
      ).subscribe((subtask) => {
        this.subtasks.push(subtask);
      });
    }
  }

  delete = (subtask: subtask): void => {
    if (subtask.id) {
      this.SubtaskService.deleteSubTask(subtask.id);
      this.subtasks.forEach((feSubtask, index) => {
        if (feSubtask.id == subtask.id) {
          this.subtasks.splice(index, 1);
        }
      });
    }
  };

  RevealForm(): void {
    console.log('called');
    this.subtaskButton?.nativeElement.classList.add('hidden');
    this.subtaskForm?.nativeElement.classList.remove('hidden');
  }

  HideForm(): void {
    this.subtaskButton?.nativeElement.classList.remove('hidden');
    this.subtaskForm?.nativeElement.classList.add('hidden');
  }

  getProgressBarColour(): string {
    if (this.task.percentage_complete < 20) {
      return 'warn';
    }
    if (this.task.percentage_complete > 80) {
      return 'primary';
    } else {
      return 'accent';
    }
  }
}
