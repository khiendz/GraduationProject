import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, NgModule, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { first, map } from 'rxjs/operators';
import { User } from '../../models/User';
import { AuthService } from '../../services';
import { AuthenticationService } from '../../services/authentication.service';
import { ManageUser } from '../../services/manageUser.service';
import { SideNavigationMenuComponent } from '../../components/side-navigation-menu/side-navigation-menu.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loading = false;
  formData: any = {};
  loginForm: any;
  error: any;
  obj!: SideNavigationMenuComponent;
  constructor(
    private authService: AuthService,
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  async onSubmit(e: Event) {

    e.preventDefault();
    const { username, password } = this.formData;
    this.loading = true;

    this.loading = true;
    var check;
    try
    {
    this.authentication.login(username, password).subscribe(
      (res :User) => {
        if(res != null)
        {
          this.authService.logIn(username, password);
          check = true;
        }
      },
      (error: RequestCache) => {
        console.log(error);
        this.error = error;
        this.loading = false;
        notify("Authentication failed")
      }
    );}catch(error)
    {
      console.log(error);
      this.error = error;
      this.loading = false;
      notify("Authentication failed")
    }

    // debugger
    // this.manageUser.getUserByUserName(username).subscribe(
    //   res => {
    //     localStorage.setItem('accountUser', JSON.stringify(res));
    //   }
    // );

    // this.obj.refesh();
  }

  signUp()
  {
    this.router.navigateByUrl('');
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  };
}
@NgModule({
  imports: [CommonModule, RouterModule, DxFormModule, DxLoadIndicatorModule],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
})
export class LoginFormModule {}
