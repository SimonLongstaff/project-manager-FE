import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProjectComponent } from './components/project/project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import { APILayerComponent } from './components/api-layer/api-layer.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { SubtaskContainerComponent } from './components/subtask-container/subtask-container.component';
import { SubtaskTableComponent } from './components/subtask-table/subtask-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    APILayerComponent,
    TasksComponent,
    ProjectListComponent,
    TaskListComponent,
    SubtaskContainerComponent,
    SubtaskTableComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    CdkAccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
