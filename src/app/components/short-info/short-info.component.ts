import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/loan.service';
@Component({
  selector: 'app-short-info',
  templateUrl: './short-info.component.html',
  styleUrls: ['./short-info.component.css'],
})
export class ShortInfoComponent {
  selectedMonth: string = '01'; // по умолчанию январь
  metricsCalculated: boolean = false;

  averageLoanAmount: string = '0.00'; // значение средней суммы округлено до двух знаков после запятой
  totalLoanAmount: number = 0;
  totalInterestAmount: number = 0;
  totalIssuedLoansCount: number = 0;
  totalReturnedLoansCount: number = 0;

  constructor(private loanService: LoanService) {}

  calculateMetrics() {
    this.loanService.getLoans().subscribe((loans) => {
      const selectedMonth = this.selectedMonth;
      // фильтрация кредитов избранного месяца
      const loansForSelectedMonth = loans.filter(
        (loan) =>
          loan.issuance_date &&
          loan.issuance_date.startsWith(`2021-${selectedMonth}`)
      );

      this.averageLoanAmount = this.calculateAverageLoanAmount(
        loansForSelectedMonth
      ).toFixed(1);
      this.totalLoanAmount = this.calculateTotalLoanAmount(
        loansForSelectedMonth
      );
      this.totalInterestAmount = this.calculateTotalInterestAmount(
        loansForSelectedMonth
      );
      this.totalIssuedLoansCount = this.calculateIssuedLoansCount(
        loansForSelectedMonth
      );
      this.totalReturnedLoansCount = this.calculateReturnedLoansCount(
        loansForSelectedMonth
      );

      this.metricsCalculated = true;
    });
  }

  calculateAverageLoanAmount(loans: any[]): number {
    const totalAmount = loans.reduce((sum, loan) => sum + loan.body, 0);
    return totalAmount / loans.length;
  }

  calculateTotalLoanAmount(loans: any[]): number {
    return loans.reduce((sum, loan) => sum + loan.body, 0);
  }

  calculateTotalInterestAmount(loans: any[]): number {
    return loans.reduce((sum, loan) => sum + loan.percent, 0);
  }

  calculateIssuedLoansCount(loans: any[]): number {
    return loans.length;
  }

  calculateReturnedLoansCount(loans: any[]): number {
    return loans.filter((loan) => loan.actual_return_date).length;
  }
}
