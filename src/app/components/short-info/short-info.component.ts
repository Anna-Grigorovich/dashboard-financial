import { Component } from '@angular/core';
import { IapiData, LoanService } from 'src/app/loan.service';

@Component({
  selector: 'app-short-info',
  templateUrl: './short-info.component.html',
  styleUrls: ['./short-info.component.css'],
})
export class ShortInfoComponent {
  selectedMonth: string = '01'; // по умолчанию январь
  selectedYear: string = '2021'; // по умолчанию 2021 год
  metricsCalculated: boolean = false;

  averageLoanAmount: string = '0.00'; // значение средней суммы округлено до двух знаков после запятой
  totalLoanAmount: number = 0;
  totalInterestAmount: number = 0;
  totalIssuedLoansCount: number = 0;
  totalReturnedLoansCount: number = 0;

  constructor(private loanService: LoanService) {}

  calculateMetrics() {
    const selectedMonth = this.selectedMonth;
    const selectedYear = this.selectedYear;

    this.loanService.getLoans().subscribe((loans) => {
      // фильтрация кредитов по выбранному месяцу и году
      const loansForSelectedMonth = loans.filter((loan) => {
        const issuanceDate = loan.issuance_date;
        if (issuanceDate) {
          const [year, month] = issuanceDate.split('-');
          return year === selectedYear && month === selectedMonth;
        }
        return false;
      });

      this.averageLoanAmount = this.calculateAverageLoanAmount(
        loansForSelectedMonth
      ).toFixed(2);
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

  calculateAverageLoanAmount(loans: IapiData[]): number {
    if (loans.length === 0) {
      return 0;
    }
    const totalAmount = loans.reduce((sum, loan) => sum + loan.body, 0);
    return totalAmount / loans.length;
  }

  calculateTotalLoanAmount(loans: IapiData[]): number {
    return loans.reduce((sum, loan) => sum + loan.body, 0);
  }

  calculateTotalInterestAmount(loans: IapiData[]): number {
    return loans.reduce((sum, loan) => sum + loan.percent, 0);
  }

  calculateIssuedLoansCount(loans: IapiData[]): number {
    return loans.length;
  }

  calculateReturnedLoansCount(loans: IapiData[]): number {
    return loans.filter((loan) => loan.actual_return_date).length;
  }
}
