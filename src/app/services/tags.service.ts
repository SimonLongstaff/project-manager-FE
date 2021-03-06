import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tag } from "../interfaces/tag";

@Injectable({
	providedIn: "root"
})
export class TagsService {
	private apiUrl: string =
		window.location.protocol + "//" + window.location.hostname + ":3000/tags";

	constructor(private http: HttpClient) {}

	GetAllTags(): Observable<Tag[]> {
		return this.http.get<Tag[]>(this.apiUrl);
	}

	CreateNewTag(
		tagName: string,
		tagType: number,
		tagColour: string
	): Observable<Tag> {
		let newTag = {
			tag_name: tagName,
			tag_type: Number(tagType),
			tag_colour: tagColour
		};

		console.log(newTag);

		return this.http.post<Tag>(this.apiUrl, newTag);
	}

	GetTag(id: number): Observable<Tag> {
		return this.http.get<Tag>(this.apiUrl + "/" + id);
	}

	UpdateTag(tag: Tag): Observable<Tag> {
		return this.http.put<Tag>(this.apiUrl + "/" + tag.id, tag);
	}

	DeleteTag(tagId: number): void {
		this.http.delete(this.apiUrl + "/" + tagId).subscribe({
			next: data => {
				return true;
			},
			error: error => {
				console.log(error);
				return false;
			}
		});
	}
}
