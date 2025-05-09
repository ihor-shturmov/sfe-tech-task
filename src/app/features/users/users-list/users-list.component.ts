import { Component, input, output, OutputEmitterRef } from '@angular/core';
import { User } from '../../../shared/models/user';
import {
  MatCell, MatCellDef, MatColumnDef, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    MatRow,
    MatIcon,
    MatCell,
    MatTable,
    MatRowDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderRow,
    MatHeaderCell,
    MatIconButton,
    MatHeaderRowDef,
    MatHeaderCellDef,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  users = input<User[]>();

  edit: OutputEmitterRef<number> = output();

  displayedColumns = ['position', 'username', 'role', 'actions'];

  editUser(user: User): void {
    this.edit.emit(user.id);
  }
}
