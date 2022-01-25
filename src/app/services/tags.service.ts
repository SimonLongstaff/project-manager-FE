import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../interfaces/tag";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private apiUrl: string = "http://localhost:3000/tags";

  constructor(private http: HttpClient) {
  }

  GetAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl)
  }

  CreateNewTag(tagName: string, tagType: number, tagColour: string): Observable<Tag> {

    let newTag = {
      tag_name: tagName,
      tag_type: Number(tagType),
      tag_colour: tagColour
    }

    console.log(newTag)

    return this.http.post<Tag>(this.apiUrl, newTag)
  }

  GetTag(id:number): Observable<Tag>{
    return this.http.get<Tag>(this.apiUrl + '/' + id)
  }
}
