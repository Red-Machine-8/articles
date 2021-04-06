import { Component, OnInit } from '@angular/core';
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {of} from "rxjs";
import {MaterialService} from "../shared/classes/material.service";
import {Contact} from "../shared/interfaces";
import {ContactService} from "../shared/services/contact.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  contact: Contact;
  form: FormGroup;
  constructor(private route: ActivatedRoute, public contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params: Params) => {
          if (params['id']) {
            return this.contactService.getById(params['id']);
          }
          return of(null);
        }
      ))
      .subscribe(
        contact => {
          if (contact) {
            this.contact = contact;
          }
          this.form.enable();
        },
        error => MaterialService.toast(error.erros.message)
      );
  }


  deleteContact() {
    const decision = window.confirm('Вы уверены, что хотите удалить статью ?')
    if (decision) {
      this.contactService.delete(this.contact._id).subscribe(
        response => MaterialService.toast(response.message),
        error => MaterialService.toast(error.error.message),
        ()=>this.router.navigate(['/contacts'])
      );

    }
  }

}
