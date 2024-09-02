import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { List } from '../../interfaces/List';
import { Router } from '@angular/router';
import { Task } from 'src/app/interfaces/Task';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists: List[] = [];
  tasks: Task[] = [];
  user: any = null;
  user_id: number | null = null;
  newListTitle: string = '';

  constructor(
    private publicationService: PublicationService,
    private userService: UserService,
    private router: Router
  ) {}

ngOnInit(): void {
  this.user = this.userService.getIdentity();
  console.log('User from getIdentity:', this.user); // Verifique o valor retornado
  if (this.user) {
    this.user_id = this.user.id ? Number(this.user.id) : null;
    console.log('User ID:', this.user_id); // Verifique o ID do usuário
    if (this.user_id !== null) {
      this.getLists(this.user_id);
    } else {
      console.error('User ID is null.');
    }
  } else {
    console.error('User is not authenticated.');
  }
}


  refresh($event: Event = null): void {
    if (this.user_id !== null) {
      this.getLists(this.user_id);
    } else {
      console.error('User ID is null. Cannot refresh the list.');
    }
  }

  getLists(id: number): void {
    this.publicationService.getLists(id).subscribe(
      res => {
        console.log(res);
        this.lists = res.list || [];
        this.tasks = res.list.tasks || [];
      },
      err => {
        console.error('Error fetching lists:', err);
      }
    );
  }

  deleteList(id: number): void {
    if (id) {
      this.publicationService.deleteList(id).subscribe(
        res => {
          console.log('List deleted successfully:', res);
          this.refresh();
        },
        err => {
          console.error('Error deleting list:', err);
        }
      );
    } else {
      console.error('Cannot delete list. ID is null or undefined.');
    }
  }

  newTask(listId: number): void {
    if (listId) {
      localStorage.setItem('listId', String(listId));
      this.router.navigate(['/adicionar-tarefa']);
    } else {
      console.error('Cannot create new task. List ID is null or undefined.');
    }
  }

  deleteTask(id: number): void {
    if (id) {
      this.publicationService.deleteTask(id).subscribe(
        res => {
          console.log('Task deleted successfully:', res);
          this.refresh();
        },
        err => {
          console.error('Error deleting task:', err);
        }
      );
    } else {
      console.error('Cannot delete task. ID is null or undefined.');
    }
  }

  addList(): void {
    console.log('Adding list with title:', this.newListTitle, 'and user_id:', this.user_id);

    if (this.newListTitle.trim() && this.user_id !== null) {
      this.publicationService.addList(this.newListTitle, this.user_id).subscribe(
        res => {
          console.log('List added successfully:', res);
          this.newListTitle = '';
          this.refresh();
        },
        err => {
          console.error('Error adding list:', err);
        }
      );
    } else {
      console.error('The title of the list cannot be empty and the user ID must be defined.');
    }
  }
}