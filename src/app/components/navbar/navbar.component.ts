import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private service: MainServiceService,
    private router: Router) { }
  authenticated:any = localStorage.getItem("token")
  logout() {
    this.service.logout().subscribe({
      next: () => {
        localStorage.removeItem("token")
        location.reload();
        this.router.navigate(["/login"])
    }
  })
}
}
