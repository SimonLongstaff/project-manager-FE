import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Project } from 'src/app/interfaces/Project';
import { ProjectService } from './../../services/project.service';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.css'],
})
export class NewProjectModalComponent implements OnInit {
  @Input() Projects: Project[] = [];
  @ViewChild('name') name: ElementRef | undefined;
  @ViewChild('desc') desc: ElementRef | undefined;

  @Output() close = new EventEmitter<void>();

  constructor(private ProjectService: ProjectService) {}

  ngOnInit(): void {}

  OnClose(): void {
    this.close.emit();
  }

  addProject(): void {
    if (
      this.name?.nativeElement.value != '' &&
      this.desc?.nativeElement.value != ''
    ) {
      this.ProjectService.addProject(
        this.name?.nativeElement.value,
        this.desc?.nativeElement.value
      ).subscribe((project) => {
        this.Projects.push(project);
        this.close.emit();
      });
    }
  }
}
