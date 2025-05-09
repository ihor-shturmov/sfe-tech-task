import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserStore} from '../stores/users.store';

export const authGuardFn: CanActivateFn = (route, state) => {

  const userStore = inject(UserStore);
  const router = inject(Router);

  const token = userStore.token();

  if (token) {
    return true;
  }
debugger
  return router.createUrlTree(['/auth']);

}
