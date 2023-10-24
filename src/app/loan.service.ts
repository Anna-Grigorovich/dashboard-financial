import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private apiUrl =
    'https://raw.githubusercontent.com/LightOfTheSun/front-end-coding-task-db/master/db.json';

  constructor(private http: HttpClient) {}

  getLoans(): Observable<IapiData[]> {
    return this.http.get<IapiData[]>(this.apiUrl);
  }
}
export interface IapiData {
  id: number;
  user: string;
  issuance_date: string;
  return_date: string;
  actual_return_date: string | null;
  body: number;
  percent: number;
}

// {
//     "id": 1,
//     "user": "pageantrylamentable",
//     "issuance_date": "2020-01-11",
//     "return_date": "2020-01-25",
//     "actual_return_date": "2021-04-23",
//     "body": 4500,
//     "percent": 32535.0
//   },
