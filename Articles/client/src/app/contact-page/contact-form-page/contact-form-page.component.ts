import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Contact} from "../../shared/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ContactService} from "../../shared/services/contact.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-contact-form-page',
  templateUrl: './contact-form-page.component.html',
  styleUrls: ['./contact-form-page.component.css']
})
export class ContactFormPageComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  form: FormGroup;

  isNew = true;

  contact: Contact;

  constructor(private route: ActivatedRoute, public contactService: ContactService, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      body: new FormControl('')
    })

    this.form.disable();

    this.route.params
      .pipe(switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false;
            return this.contactService.getById(params['id']);
          }
          return of(null);
        }
      ))
      .subscribe(
        contact => {
          if (contact) {
            this.contact = contact;
            this.form.patchValue({
              title: this.contact.title,
              body: this.contact.body
            });
            MaterialService.updateTextInput();
          }
          this.form.enable();
        },
        error => MaterialService.toast(error.erros.message)
      );
    }

  onSubmit() {
    let obs$;
    this.form.disable();
    if (this.isNew) {
      obs$ = this.contactService.create(this.form.value.title, this.form.value.body);
    } else {
      obs$ = this.contactService.update(this.contact._id, this.form.value.title, this.form.value.body);
    }

    obs$.subscribe(
      contact => {
        this.contact = contact;
        MaterialService.toast('Изменения сохранены');
        this.form.enable();
      },
      error => {
        MaterialService.toast(this.contact.title)
        //MaterialService.toast(error.error.message);
        console.log(this.contact);
        this.form.enable();
      }
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
