import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../loan.service';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-loan-table',
  templateUrl: './loan-tabled.component.html',
  styleUrls: ['./loan-tabled.component.css'],
})
export class LoanTableComponent implements OnInit {
  loans: any[] = [];

  issuanceDateFilter = new BehaviorSubject<string>('');
  actualReturnDateFilter = new BehaviorSubject<string>('');
  overdueFilter = new BehaviorSubject<boolean>(false);
  filteredLoans$: Observable<any[]>;

  constructor(private loanService: LoanService) {
    this.filteredLoans$ = combineLatest([
      this.loanService.getLoans(),
      this.issuanceDateFilter,
      this.actualReturnDateFilter,
      this.overdueFilter,
    ]).pipe(
      map(([loans, issuanceDate, actualReturnDate, isOverdue]) => {
        return loans.filter((loan) => {
          const issuanceDateMatch =
            !issuanceDate || loan.issuance_date?.includes(issuanceDate);
          const actualReturnDateMatch =
            !actualReturnDate ||
            loan.actual_return_date?.includes(actualReturnDate);
          const overdueMatch =
            !isOverdue ||
            (loan.actual_return_date &&
              new Date(loan.actual_return_date) > new Date(loan.return_date)) ||
            (loan.actual_return_date === null &&
              new Date(loan.return_date) < new Date());

          return issuanceDateMatch && actualReturnDateMatch && overdueMatch;
        });
      })
    );
  }

  updateIssuanceDateFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.issuanceDateFilter.next(value);
  }

  updateActualReturnDateFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.actualReturnDateFilter.next(value);
  }

  updateOverdueFilter(event: Event) {
    const value = (event.target as HTMLInputElement).checked;

    this.overdueFilter.next(value);
  }

  ngOnInit() {
    this.loanService.getLoans().subscribe((data) => {
      this.loans = data;
    });
  }
}
