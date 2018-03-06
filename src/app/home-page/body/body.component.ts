import { Component, OnInit } from '@angular/core';
import { cacheoutWaitlist } from '../../../util/active-campaign';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  email = '';
  joinClicked = false;
  submitted = false;
  constructor() { }
  ngOnInit() {}

  onSubmit = () => {
    if (this.email !== '') {
      if (!this.validateEmail(this.email)) {
        return;
      }
      this.joinClicked = true;
    }
  }

  resolved = (captchaResponse: string) => {
    if (captchaResponse) {
      cacheoutWaitlist(this.email);
      this.email = '';
      this.submitted = true;
    }
  }

  validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
