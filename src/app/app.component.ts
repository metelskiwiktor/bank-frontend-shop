import { Component } from '@angular/core';
import {AccountStorage} from './service/account-storage';
import {OauthComponent} from './oauth/oauth.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public accountStorage: AccountStorage, public ouath: OauthComponent) {
  }

  title = 'bank-frontend-shop';
}
