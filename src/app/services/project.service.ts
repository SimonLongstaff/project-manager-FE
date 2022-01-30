import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../interfaces/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl: string = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    console.log(this.http.get(this.apiUrl));
    return this.http.get<Project[]>(this.apiUrl);
  }

  addProject(name: string, desc: string, tagId: number | null): Observable<Project> {
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
    })
  }
}
