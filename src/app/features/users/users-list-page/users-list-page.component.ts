import { Component, inject } from '@angular/core';
import { UsersListComponent } from '../users-list/users-list.component';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { UsersFacadeService } from '../../../core/facades/users-facade.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [
    MatButton,
    MatProgressSpinner,
    UsersListComponent,
  ],
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss'
})
export class UsersListPageComponent {
  facade = inject(UsersFacadeService);
  router = inject(Router);

  constructor() {
    this.facade.loadUsers();
  }


  goToNew(): void {
    this.router.navigate(['/users/create']);
  }

  goToEdit(id: number): void {
    const user = this.facade.users().find(u => u.id === id)!;
    this.facade.setUser(user);
    this.router.navigate(['/users', id]);
  }
}
