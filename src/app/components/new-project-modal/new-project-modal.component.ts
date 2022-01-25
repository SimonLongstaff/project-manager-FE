import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {Project} from 'src/app/interfaces/Project';
import {ProjectService} from './../../services/project.service';
import {TagsService} from "../../services/tags.service";
import {Tag} from "../../interfaces/tag";

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.css'],
})
export class NewProjectModalComponent implements OnInit {

  @Input() Projects: Project[] = [];
  Tags: Tag[] = [];

  @ViewChild('name')
  name!: ElementRef;

  @ViewChild('desc')
  desc!: ElementRef;

  @ViewChild('tag')
  tag!: ElementRef;

  @Output() close = new EventEmitter<void>();

  constructor(private ProjectService: ProjectService, private TagsService:TagsService) {
  }

  ngOnInit(): void {
    this.TagsService.GetAllTags().subscribe((tags)=>{this.Tags = tags});
  }

  OnClose(): void {
    this.close.emit();
  }

  addProject(): void {
    if (
      this.name?.nativeElement.value === '' &&
      this.desc?.nativeElement.value === ''
    ) {return;}

    this.ProjectService.addProject(
      this.name.nativeElement.value,
      this.desc.nativeElement.value,
      this.tag.nativeElement.value
    ).subscribe((project) => {
      this.Projects.push(project);
      this.close.emit();
    });


  }
}
