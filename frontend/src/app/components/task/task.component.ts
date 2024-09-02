// task.component.ts
import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  identity: any;
  listId: string | null = null;
  task: Task;

  constructor(
    private userService: UserService,
    private publicationService: PublicationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.identity = this.userService.getIdentity();
    this.listId = localStorage.getItem('listId');

    this.task = {
      _id: "",
      text: "",
      user_id: this.identity ? +this.identity.id : 0,
      list_id: this.listId ? +this.listId : 0, 
      created_at: ""
    };

    console.log(this.identity);
    console.log(this.listId);
  }

  addTask(): void {
    console.log(this.task);
    this.publicationService.addTask(this.task).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/listas']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
