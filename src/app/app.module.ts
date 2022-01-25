import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { ProjectComponent } from "./components/project/project.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { TasksComponent } from "./components/tasks/tasks.component";
import { ProjectListComponent } from "./components/project-list/project-list.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { SubtaskTableComponent } from "./components/subtask-table/subtask-table.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ProgressBarComponent } from "./components/Ui_Components/progress-bar/progress-bar.component";
import { HeaderComponent } from "./components/root/header/header.component";
import { AlertModalComponent } from "./components/root/alert-modal/alert-modal.component";
import { NewProjectModalComponent } from "./components/new-project-modal/new-project-modal.component";
import { MatIconModule } from "@angular/material/icon";
import { NewSubtaskModalComponent } from "./components/new-subtask-modal/new-subtask-modal.component";
import { WorkDoneModalComponent } from "./components/work-done-modal/work-done-modal.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatTableModule } from "@angular/material/table";
import { SubTaskRowComponent } from './components/sub-task-row/sub-task-row.component';
import { AddTagModalComponent } from './components/add-tag-modal/add-tag-modal.component';
import { TagDisplayComponent } from './components/tag-display/tag-display.component';

@NgModule({
	declarations: [
		AppComponent,
		ProjectComponent,
		TasksComponent,
		ProjectListComponent,
		TaskListComponent,
		SubtaskTableComponent,
		ProgressBarComponent,
		HeaderComponent,
		AlertModalComponent,
		NewProjectModalComponent,
		NewSubtaskModalComponent,
		WorkDoneModalComponent,
  SubTaskRowComponent,
  AddTagModalComponent,
  TagDisplayComponent
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		MatCardModule,
		CdkAccordionModule,
		MatProgressBarModule,
		MatIconModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatTableModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
