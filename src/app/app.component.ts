import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UserStore} from './core/stores/users.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private userStore = inject(UserStore);

  title = 'SFE Tech Task';

  constructor() {
    this.userStore.loadTokenFromLocalStorage();
  }
}
