import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { Project } from "../../interfaces/Project";
import { Tag } from "../../interfaces/tag";
import {TagsService} from "../../services/tags.service";
import {ProjectService} from "../../services/project.service";

@Component({
	selector: "app-archived-project",
	templateUrl: "./archived-project.component.html",
	styleUrls: ["./archived-project.component.css"]
})
export class ArchivedProjectComponent implements OnInit {
	@Input() project!: Project;
	tag: Tag | undefined;

  @Output() archived = new EventEmitter<Project>();

	constructor(private TagService: TagsService, private ProjectService: ProjectService) {}

	ngOnInit(): void {
    if (this.project.tag_id != null) {
      this.TagService.GetTag(this.project.tag_id).subscribe(tag => {
        this.tag = tag;
      });
    }
  }

  UnArchiveProject(): void {
    this.ProjectService.ArchiveProject(this.project.id, false).subscribe((project) =>
      {
        this.project = project;
        this.archived.emit(this.project);
      }
    )
  }
}
