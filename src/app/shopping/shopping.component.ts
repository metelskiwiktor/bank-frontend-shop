import {Component, OnInit} from '@angular/core';
import {Product} from '../model/Product';
import {HttpClientService} from '../service/http-client.service';
import {TransactionTransfer} from '../model/TransactionTransfer';
import {AccountStorage} from '../service/account-storage';
import {Router} from '@angular/router';
import {OauthComponent} from '../oauth/oauth.component';
import {Login} from '../model/Login';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  products: Product[] = [];
  choiceProducts: boolean[] = [];
  transaction: TransactionTransfer = new TransactionTransfer();
  user: Login = new Login();

  constructor(private httpClientService: HttpClientService, private accountStorage: AccountStorage, private router: Router,
              private oauth: OauthComponent) {
    this.products[0] = new Product('mleko', 1.59);
    this.products[1] = new Product('ser', 2.99);
    this.products[2] = new Product('woda', 0.99);
    this.products[3] = new Product('banan', 1.22);

    this.choiceProducts[0] = true;
    this.choiceProducts[1] = true;
    this.choiceProducts[2] = true;
    this.choiceProducts[3] = true;
  }

  ngOnInit(): void {
  }

  price() {
    let price = 0;
    this.products.forEach((value, index) => {
      if (this.choiceProducts[index] === true) {
        price += value.price;
      }
    });
    return price;
  }

  authorize() {
    if (this.user.number != null && this.user.firstName != null && this.user.lastName != null && this.user.expiryDate != null && this.user.ccv != null) {
      this.oauth.login(this.user);
    }
  }

  buy() {
    this.transaction.title = 'zakupy biedronka';
    this.transaction.senderAccountNumber = this.accountStorage.getAccountNumber();
    this.transaction.recipientAccountNumber = '809665883431313381999556';
    this.transaction.amount = this.price();
    this.httpClientService.createTransaction(this.transaction).then(() => {
      alert('Pomyślnie zakupiono produkty za ' + this.price() + 'zł');
      this.oauth.logout();
      location.reload();
    }).catch(error => {
      console.log(error);
      alert(error.error.errorMessage);
    });
  }
}
