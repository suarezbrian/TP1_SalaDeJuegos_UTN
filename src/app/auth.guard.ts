import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SharedService } from './shared.service';
import { map, take, tap } from 'rxjs';
import { AlertsService } from './services/alerts.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sharedService = inject(SharedService);
  const router = inject(Router);
  const alertService = inject(AlertsService);

  return sharedService.estaLogeado$.pipe(
    take(1),
    map(estaLogeado => !! estaLogeado),
    tap(loggedIn => {
      if (!loggedIn) {
        router.navigate(['/home']);
        alertService.mostrarAlerta(false, 'No tienes acceso, por favor inicia sesión', 2000);
      }
    })
  );
};