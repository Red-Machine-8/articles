import { Component } from '@angular/core';
import {AfterViewInit, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {MaterialService} from '../../classes/material.service'


@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SiteLayoutComponent implements AfterViewInit {

  @ViewChild('actionBtn') actionBtnEl: ElementRef

  constructor(private auth: AuthService, private router: Router) { }

  logout(event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.actionBtnEl)
  }

}
