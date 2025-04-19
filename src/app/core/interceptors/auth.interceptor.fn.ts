import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {UserStore} from '../stores/users.store';

export const authInterceptorFn: HttpInterceptorFn = ((req, next) => {
  const userStore = inject(UserStore);
  const token = userStore.token();

  if (token) {
    req = req.clone(
      {setHeaders: {Authorization: `Bearer ${token}`}}
    )
  }

  return next(req);
})
