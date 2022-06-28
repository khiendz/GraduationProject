import { Component, OnInit } from '@angular/core';
import { Account, TaiKhoan } from '../../models/TaiKhoan.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: Account;

  positions: string[];

  states: string[];
  constructor(private authenService: AuthenticationService) {

    this.positions = [];
    this.states = [];
   }

  ngOnInit(): void {
  }

}
