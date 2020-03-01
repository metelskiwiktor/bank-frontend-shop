import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountStorage} from './account-storage';
import {Details} from '../model/Details';
import {Login} from '../model/Login';
import {TransactionTransfer} from '../model/TransactionTransfer';
import {Client} from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, private accountStorage: AccountStorage) {
  }

  public createTransaction(transaction: TransactionTransfer) {
    transaction.client = Client.SHOP;
    const tokenValue = this.accountStorage.getTokenValue();
    return this.httpClient.post('http://localhost:8090/transaction/transfer', transaction, {headers: {tokenValue}}).toPromise();
  }

  public login(login: Login) {
    login.client = Client.SHOP;
    return this.httpClient.post('http://localhost:8090/oauth/login/credit-card', login, {responseType: 'text'});
  }

  public logout() {
    const tokenValue = this.accountStorage.getTokenValue();
    this.httpClient.get('http://localhost:8090/oauth/logout', {headers: {tokenValue}});
    this.accountStorage.logout();
  }

  public getAccountDetails(): Observable<Details> {
    const tokenValue = this.accountStorage.getTokenValue();
    const http = this.httpClient.get<Details>('http://localhost:8090/account/details', {headers: {tokenValue}});
    http.subscribe(value => {
      this.accountStorage.setAccountDetails(value.balance, value.accountNumber);
    });
    return http;
  }
}
