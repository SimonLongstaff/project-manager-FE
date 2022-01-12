import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../Project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl: string = 'http://localhost:3000/projects';

  constructor(private http:HttpClient) { }

  getProjects(): Observable<Project[]>{
    console.log(this.http.get(this.apiUrl))
    return this.http.get<Project[]>(this.apiUrl)
  }
}
