import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  email = '';
  joinClicked = false;
  submitted = false;

  constructor(private http: HttpClient) {
  }

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
      this.submitEmail();
      this.email = '';
      this.submitted = true;
    }
  }

  submitEmail = () => {
    this.http.post(`https://api.devslopes.com/v1/defaults/join-cacheout-waitlist/${this.email}`, {})
      .subscribe(result => {}, err => {});
  }

  validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
