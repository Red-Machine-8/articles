import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {MaterialService} from "../shared/classes/material.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  form: FormGroup

  constructor(private auth: AuthService,
              private  router: Router) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(){
    this.form.disable()
    this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'])
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }
}
