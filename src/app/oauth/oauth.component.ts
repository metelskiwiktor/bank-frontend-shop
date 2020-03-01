import {Component, Injectable, OnInit} from '@angular/core';
import {Login} from '../model/Login';
import {HttpClientService} from '../service/http-client.service';
import {Router} from '@angular/router';
import {AccountStorage} from '../service/account-storage';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class OauthComponent implements OnInit {
  user: Login = new Login();

  constructor(private httpClientService: HttpClientService, public route: Router, private accountStorage: AccountStorage) {
  }

  ngOnInit(): void {
  }

  login(user: Login) {
    // this.user.number = creditCardNumber;
    this.httpClientService.login(user).subscribe(value => {
      this.accountStorage.setTokenValue(value);
      this.httpClientService.getAccountDetails().toPromise().catch(reason => {
        alert(reason.error.errorMessage);
      });
    }, error => {
      alert(error.error.errorMessage);
    });
  }

  public logout() {
    this.httpClientService.logout();
    this.route.navigateByUrl('/');
  }
}
