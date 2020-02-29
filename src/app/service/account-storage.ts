import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountStorage {

  public getTokenValue(): string {
    return localStorage.getItem('tokenValue');
  }

  public setTokenValue(tokenValue: string) {
    localStorage.setItem('tokenValue', tokenValue);
  }

  public isLoggedIn(): boolean {
    return this.getTokenValue() != null;
  }

  public setAccountDetails(balance: string, accountNumber: string) {
    localStorage.setItem('balance', balance);
    localStorage.setItem('accountNumber', accountNumber);
  }

  public getAccountNumber() {
    return localStorage.getItem('accountNumber');
  }

  public getBalance() {
    return localStorage.getItem('balance');
  }

  public logout() {
    localStorage.setItem('tokenValue', '');
    localStorage.setItem('balance', '');
    localStorage.setItem('accountNumber', '');
    localStorage.removeItem('tokenValue');
    localStorage.removeItem('balance');
    localStorage.removeItem('accountNumber');
  }
}
