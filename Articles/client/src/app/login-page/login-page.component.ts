import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../shared/classes/material.service";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy{

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }



  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params:Params) => {
      if(params['accessDenied']){
        MaterialService.toast('Сначала авторизуйтесь')
      }
    })
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['contacts']),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}
