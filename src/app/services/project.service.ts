import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Project } from "../interfaces/Project";

@Injectable({
	providedIn: "root"
})
export class ProjectService {
	private apiUrl: string =
		window.location.protocol +
		"//" +
		window.location.hostname +
		":3000/projects";

	constructor(private http: HttpClient) {}

	getProjects(): Observable<Project[]> {
		console.log(this.http.get(this.apiUrl));
		return this.http.get<Project[]>(this.apiUrl);
	}

	getProject(projectId: number): Observable<Project> {
		return this.http.get<Project>(this.apiUrl + "/" + projectId);
	}

	addProject(
		name: string,
		desc: string,
		tagId: number | null
	): Observable<Project> {
		let newProject = {
			project_name: name,
			project_desc: desc,
			is_complete: 0,
			tag_id: Number(tagId),
			is_archived: false
		};

		return this.http.post<Project>(this.apiUrl, newProject);
	}

	DeleteProject(projectId: number): void {
		this.http.delete(this.apiUrl + "/" + projectId).subscribe({
			next: data => {
				return true;
			},
			error: error => {
				console.log(error);
				return false;
			}
		});
	}

	ArchiveProject(projectID: number, isArchived: Boolean): Observable<Project> {
		let patchUrl = this.apiUrl + "/" + projectID;
		let updateValue = { is_archived: isArchived };
		return this.http.patch<Project>(patchUrl, updateValue);
	}

	GetByTag(tagId: number): Observable<Project[]> {
		return this.http.get<Project[]>(this.apiUrl + "/tag_id=" + tagId);
	}

	EditProject(
		projectId: number,
		name: string,
		desc: string,
		tagId: number
	): Observable<Project> {
		let patchUrl = this.apiUrl + "/" + projectId;
		let updateValue = {
			project_name: name,
			project_desc: desc,
			tag_id: tagId
		};
		return this.http.patch<Project>(patchUrl, updateValue);
	}
}
