import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoanTableComponent } from './components/loan-tabled/loan-tabled.component';

import { HttpClientModule } from '@angular/common/http';
import { ShortInfoComponent } from './components/short-info/short-info.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TopUserComponent } from './components/top-user/top-user.component';
import { NgxPaginationModule } from 'ngx-pagination';

const appRoutes: Routes = [
  {
    path: '',
    component: LoanTableComponent,
  },
  {
    path: 'short',
    component: ShortInfoComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoanTableComponent,
    ShortInfoComponent,
    TopUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
