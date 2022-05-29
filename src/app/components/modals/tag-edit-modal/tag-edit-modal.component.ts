import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Tag } from "../../../interfaces/tag";
import { TagsService } from "../../../services/tags.service";

@Component({
	selector: "app-tag-edit-modal",
	templateUrl: "./tag-edit-modal.component.html",
	styleUrls: ["./tag-edit-modal.component.css"]
})
export class TagEditModalComponent implements OnInit {
	@Output() close = new EventEmitter<void>();
	Tags: Tag[] = [];

	constructor(private TagService: TagsService) {}

	ngOnInit(): void {
		this.TagService.GetAllTags().subscribe(tags => {
			this.Tags = tags;
		});
	}

	handleClose() {
		this.close.emit();
	}

	handleDelete(tag: Tag) {
		this.Tags = this.Tags.filter(t => t.id !== tag.id);
	}
}
