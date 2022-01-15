import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { subtask } from '../interfaces/subtask';

@Injectable({
  providedIn: 'root'
})
export class SubtaskService {

  private apiUrl: string = 'http://localhost:3000/subtasks'

  constructor(private http:HttpClient) { }

  getAllSubTasks(): Observable<subtask[]>{
    console.log( this.http.get<subtask[]>(this.apiUrl))
    return this.http.get<subtask[]>(this.apiUrl)
  }

  createNewSubTask(taskId:number, name:string, desc:string): Observable<subtask>{

   let newSubtask = {
      "task_id": taskId,
      "subtask_name": name,
      "subtask_desc": desc,
      "is_complete": 0,
      "percentage_complete": 0
    }

    return this.http.post<subtask>(this.apiUrl, newSubtask )
  }

  deleteSubTask(taskId:number):void{
    this.http.delete(this.apiUrl + '/' + taskId).subscribe({
      next: data => {
        return true;
      },
      error: error => {
        console.log(error)
        return false;
      }
    })
  }
}
