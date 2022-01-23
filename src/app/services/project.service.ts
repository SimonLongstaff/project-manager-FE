import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl: string = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    console.log(this.http.get(this.apiUrl));
    return this.http.get<Project[]>(this.apiUrl);
  }

  addProject(name: string, desc: string): Observable<Project> {
    let newProject = {
      project_name: name,
      project_desc: desc,
      is_complete: 0,
      tag_id: null,
    };

    return this.http.post<Project>(this.apiUrl, newProject);
  }
}
