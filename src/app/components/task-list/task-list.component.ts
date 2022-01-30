import {Component, Input, OnInit} from "@angular/core";
import {Task} from "src/app/interfaces/task";
import {Project} from "src/app/interfaces/Project";
import {TaskService} from "../../services/task.service";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"]
})
export class TaskListComponent implements OnInit {
  @Input() project!: Project;
  tasks: Task[] = [];

  constructor(private TaskService: TaskService) {
  }

  ngOnInit(): void {
    this.TaskService.getAllTasksByProjectId(this.project.id).subscribe(
      tasks => {
        this.tasks = tasks;
      }
    );
  }

  handleDelete(deleteTask: Task) {
    this.tasks.forEach((task, index) => {
      if (task.id === deleteTask.id) {
        this.tasks.splice(index, 1);
      }
    })
  }
}
