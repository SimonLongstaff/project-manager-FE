import {Component, Input, OnInit} from '@angular/core';
import {Tag} from 'src/app/interfaces/tag';

@Component({
  selector: 'app-tag-display',
  templateUrl: './tag-display.component.html',
  styleUrls: ['./tag-display.component.css']
})
export class TagDisplayComponent implements OnInit {

  @Input() Tag!: Tag;

  constructor() {
  }

  ngOnInit(): void {
  }

}
