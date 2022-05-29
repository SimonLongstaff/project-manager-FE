import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild
} from "@angular/core";
import { Tag } from "../../interfaces/tag";
import { TagsService } from "../../services/tags.service";
import { ProjectService } from "../../services/project.service";

@Component({
	selector: "app-tag-editor",
	templateUrl: "./tag-editor.component.html",
	styleUrls: ["./tag-editor.component.css"]
})
export class TagEditorComponent implements OnInit {
	@Input() tag!: Tag;
	@Output() delete = new EventEmitter<Tag>();
	@ViewChild("tagName") name!: ElementRef;
	@ViewChild("tagColour") colour!: ElementRef;

	numberOfProjects: string = "";

	constructor(
		private tagsService: TagsService,
		private projectService: ProjectService
	) {}

	ngOnInit(): void {
		this.projectService.GetByTag(this.tag.id).subscribe(projects => {
			if (projects.length > 1 || projects.length == 0) {
				this.numberOfProjects = projects.length + " Projects";
			} else {
				this.numberOfProjects = projects.length + " Project";
			}
		});
	}

	updateTag(tag: Tag) {
		tag.tag_colour = this.colour.nativeElement.value;
		tag.tag_name = this.name.nativeElement.value;
		this.tagsService.UpdateTag(tag).subscribe(() => {
			console.log("Tag updated");
		});
	}

	deleteTag(tag: Tag) {
		if (this.numberOfProjects === "0 Projects") {
			this.tagsService.DeleteTag(tag.id);
			this.delete.emit(tag);
		}
	}
}
