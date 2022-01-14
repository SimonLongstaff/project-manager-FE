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

  getAllSubTaks(): Observable<subtask[]>{
    return this.http.get<subtask[]>(this.apiUrl)
  }
}
