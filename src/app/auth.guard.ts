import { inject } from '@angular/core';
import { AuthGuard } from '@auth0/auth0-angular';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate(route, state);
};
