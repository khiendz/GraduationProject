import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ValidationCallbackData } from 'devextreme/ui/validation_rules';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss'],
})
export class CreateAccountFormComponent {
  loading = false;
  formData: any = {};

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email, userName, password } = this.formData;
    this.loading = true;

    await this.authService
      .register(email, userName, password)
      .subscribe((data) => {
        const result = data;
        this.loading = false;
        if (result.status === "Success") {
          notify(result.message,'Success',1500);
          this.router.navigate(['/login-form']);
        }
      },error =>
      {
        if(error != "OK")
        {
          notify(error,'Error',1500);
          this.loading = false;
        }else
        {
          notify('User has some fields missing','Error',1500);
          this.loading = false;
        }
      });
  }

  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.formData.password;
  };
}
@NgModule({
  imports: [CommonModule, RouterModule, DxFormModule, DxLoadIndicatorModule],
  declarations: [CreateAccountFormComponent],
  exports: [CreateAccountFormComponent],
})
export class CreateAccountFormModule {}
