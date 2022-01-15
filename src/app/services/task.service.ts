import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../interfaces/task";


@Injectable({
  providedIn: 'root'
})
export class TaskService{
  private apiUrl: string = 'http://localhost:3000/tasks';

  constructor(private http:HttpClient) { }

  getAllTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl)
  }

  createNewTask(projectId: number, taskName:string, taskDesc:string): Observable<Task>{
    let newTask = {
      "project_id": projectId,
      "task_name": taskName,
      "task_desc": taskDesc,
      "is_complete": 0,
      "percentage_complete": 0
    }

    return this.http.post<Task>(this.apiUrl, newTask)
  }
}
