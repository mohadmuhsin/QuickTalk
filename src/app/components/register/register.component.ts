import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  validate!: string;
  response!: string;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service:MainServiceService
  ) {
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  signup() {
    this.markFormGroupTouched(this.form);
    if (this.form.valid) {
      const userData = this.form.getRawValue();
      
      this.service.signup(userData).subscribe({
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
