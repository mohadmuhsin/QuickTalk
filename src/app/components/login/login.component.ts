import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  validate!: string;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service :MainServiceService
  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }


  login() {
    this.markFormGroupTouched(this.form)
    if (this.form.valid) {
      const userData = this.form.getRawValue();
     
      
      this.service.login(userData).subscribe({
        next: (res:any) => {
          localStorage.setItem("token", res.token);
          location.reload();
          this.router.navigate(['/']);
        }, error: (err) => {
          this.validate = err.error.message;
        }
      })
    }
  }


  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
