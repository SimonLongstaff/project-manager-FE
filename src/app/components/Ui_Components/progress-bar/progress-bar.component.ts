import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  @Input() percentage: number = 0;

  constructor() {}

  ngOnInit() {}

  getColour(): string {
    if (this.percentage < 20) {
      return 'progress-red';
    }
    if (this.percentage > 80) {
      return 'progress-green';
    } else return 'progress-yellow';
  }
}
