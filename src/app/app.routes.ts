import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './core/auth/auth.guard';
import { MagicalObjectListComponent } from './magical-objects/magical-object-list/magical-object-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'magical-objects',
    component: MagicalObjectListComponent,
    canActivate: [AuthGuard],
  },
];
