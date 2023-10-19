import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/loan.service';

@Component({
  selector: 'app-top-users',
  templateUrl: './top-user.component.html',
})
export class TopUserComponent implements OnInit {
  topUsersReceivedCredits: any[] = [];
  topUsersPaidInterest: any[] = [];
  topUsersReturnedCredits: any[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit() {
    this.loanService.getLoans().subscribe((loans) => {
      const userCreditCounts: { [key: string]: number } = {};
      const userPaidInterest: { [key: string]: number } = {};
      const userReturnedCredits: { [key: string]: number } = {};

      for (const loan of loans) {
        if (loan.user in userCreditCounts) {
          userCreditCounts[loan.user]++;
        } else {
          userCreditCounts[loan.user] = 1;
        }

        if (loan.actual_return_date) {
          if (loan.user in userPaidInterest) {
            userPaidInterest[loan.user] += loan.percent;
          } else {
            userPaidInterest[loan.user] = loan.percent;
          }
        }

        if (loan.actual_return_date) {
          if (loan.user in userReturnedCredits) {
            userReturnedCredits[loan.user]++;
          } else {
            userReturnedCredits[loan.user] = 1;
          }
        }
      }

      this.topUsersReceivedCredits = Object.keys(userCreditCounts)
        .sort((a, b) => userCreditCounts[b] - userCreditCounts[a])
        .slice(0, 10);

      this.topUsersPaidInterest = Object.keys(userPaidInterest)
        .sort((a, b) => userPaidInterest[b] - userPaidInterest[a])
        .slice(0, 10);

      this.topUsersReturnedCredits = Object.keys(userReturnedCredits)
        .sort((a, b) => userReturnedCredits[b] - userReturnedCredits[a])
        .slice(0, 10);
    });
  }
}
