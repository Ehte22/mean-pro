import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const x = localStorage.getItem("auth")
  let user
  if (x) {
    user = JSON.parse(x)
  }

  return x ? router.navigate(['/user']) : true
};
