import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Contact} from "../shared/interfaces";
import {ContactService} from "../shared/services/contact.service";
import {MaterialService} from "../shared/classes/material.service";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  contact$: Observable<Contact[]>
  contact: Contact

  constructor(private   contactService: ContactService, private router: Router) {
  }

  ngOnInit(): void {
      this.contact$ = this.contactService.fetch()
  }
  form: FormGroup;
  deleteContact() {
    const decision = window.confirm('Вы уверены, что хотите удалить контакт ?')
    if (decision) {
      this.contactService.delete(this.contact._id).subscribe(
        response => MaterialService.toast(response.message),
        error => MaterialService.toast(error.error.message),
        ()=>this.router.navigate(['/contacts'])
      );

    }
  }

}
