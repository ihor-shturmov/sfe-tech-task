import { Component, effect, inject, input, output, OutputEmitterRef} from '@angular/core';
import { User } from '../../../shared/models/user';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  user = input<User | null>();

  save: OutputEmitterRef<Partial<User>> = output();
  cancel: OutputEmitterRef<void> = output();

  private fb = inject(FormBuilder);

  form = this.fb.group({
    username: ['', [Validators.required, this.userNameValidator('test')]],
    role: ['', Validators.required],
    password: ['']
  });

  constructor() {
    effect(() => {
      if (this.user()) {
        this.form.patchValue({
          username: this.user()?.username,
          role: this.user()?.role,
          password: this.user()?.password
        })
      }
    });
  }


  submit(): void {
    if (this.form.valid) {
      const userData = {...this.user(), ...this.form.value};
      this.save.emit(userData as Partial<User>);
    }
  }

  private userNameValidator(excludedWord: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value.includes(excludedWord) ? {forbiddenName: {value: control.value}} : null;
    }
  }

}
