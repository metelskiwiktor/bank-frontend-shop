import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShoppingComponent} from './shopping/shopping.component';
import {OauthComponent} from './oauth/oauth.component';


const routes: Routes = [
  {path: '', component: ShoppingComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
