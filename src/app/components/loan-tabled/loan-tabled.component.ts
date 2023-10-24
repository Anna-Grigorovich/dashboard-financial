
import { Component, OnInit } from '@angular/core';
import { IapiData, LoanService } from '../../loan.service';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-loan-table',
  templateUrl: './loan-tabled.component.html',
  styleUrls: ['./loan-tabled.component.css'],
})
export class LoanTableComponent implements OnInit {
  loans: IapiData[] = [];

  issuanceDateFilter = new BehaviorSubject<string>('');
  actualReturnDateFilter = new BehaviorSubject<string>('');
  startDateFilter = new BehaviorSubject<string>(''); // Начальная дата фильтра
  endDateFilter = new BehaviorSubject<string>(''); // Конечная дата фильтра
  overdueFilter = new BehaviorSubject<boolean>(false);
  filteredLoans$: Observable<IapiData[]>;

  constructor(private loanService: LoanService) {
    this.filteredLoans$ = combineLatest([
      this.loanService.getLoans(),
      this.issuanceDateFilter,
      this.actualReturnDateFilter,
      this.startDateFilter,
      this.endDateFilter,
      this.overdueFilter,
    ]).pipe(
      map(
        ([
          loans,
          issuanceDate,
          actualReturnDate,
          startDate,
          endDate,
          isOverdue,
        ]) => {
          return loans.filter((loan) => {
            const issuanceDateMatch =
              !issuanceDate || loan.issuance_date?.includes(issuanceDate);
            const actualReturnDateMatch =
              !actualReturnDate ||
              loan.actual_return_date?.includes(actualReturnDate);
            const startDateMatch =
              !startDate || new Date(loan.issuance_date) >= new Date(startDate);
            const endDateMatch =
              !endDate || new Date(loan.issuance_date) <= new Date(endDate);
            const overdueMatch =
              !isOverdue ||
              (loan.actual_return_date &&
                new Date(loan.actual_return_date) >
                  new Date(loan.return_date)) ||
              (loan.actual_return_date === null &&
                new Date(loan.return_date) < new Date());

            return (
              issuanceDateMatch &&
              actualReturnDateMatch &&
              startDateMatch &&
              endDateMatch &&
              overdueMatch
            );
          });
        }
      )
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

  updateStartDateFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.startDateFilter.next(value);
  }

  updateEndDateFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.endDateFilter.next(value);
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
