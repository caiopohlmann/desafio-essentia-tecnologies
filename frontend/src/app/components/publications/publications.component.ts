import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { List } from "../../interfaces/List";
import { Router } from '@angular/router';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  identity: any = JSON.parse(localStorage.getItem('user') || '{}');
  list: List = {
    _id: "",
    title: "",
    user_id: this.identity.id ? Number(this.identity.id) : 0 // Garantir que user_id seja um número
  };

  constructor(
    private publicationService: PublicationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.identity);
  }

  addList(): void {
    // Verifica se o título da lista não está vazio
    if (this.list.title.trim()) {
      if (this.list.user_id) {
        this.publicationService.addList(this.list.title, this.list.user_id).subscribe(
          res => {
            console.log('List added successfully:', res);
            this.router.navigate(['/listas']);
          },
          err => {
            console.error('Error adding list:', err);
          }
        );
      } else {
        console.error('User ID is not defined.');
      }
    } else {
      console.error('The title of the list is required.');
    }
  }
}
