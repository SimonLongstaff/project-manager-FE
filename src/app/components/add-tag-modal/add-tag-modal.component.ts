import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TagsService} from "../../services/tags.service";

@Component({
  selector: 'app-add-tag-modal',
  templateUrl: './add-tag-modal.component.html',
  styleUrls: ['./add-tag-modal.component.css']
})
export class AddTagModalComponent implements OnInit {

  @ViewChild('name')
  name!: ElementRef;

  @ViewChild('type')
  type!: ElementRef

  @ViewChild('colour')
  colour!: ElementRef

  @Output()
  close = new EventEmitter();

  constructor(private TagService:TagsService) { }

  ngOnInit(): void {
  }

  addTag(): void {
    this.TagService.CreateNewTag(this.name.nativeElement.value, this.type.nativeElement.value, this.colour.nativeElement.value).subscribe((tag)=>{console.log(tag)});
    this.close.emit();
  }

  handleClose(): void {
    this.close.emit();
  }

}
