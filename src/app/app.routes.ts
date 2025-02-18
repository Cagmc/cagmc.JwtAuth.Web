import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './core/auth/auth.guard';
import { MagicalObjectListComponent } from './magical-objects/magical-object-list/magical-object-list.component';
import { CreateMagicalObjectComponent } from './magical-objects/create-magical-object/create-magical-object.component';
import { EditMagicalObjectComponent } from './magical-objects/edit-magical-object/edit-magical-object.component';
import { MagicalObjectDetailsComponent } from './magical-objects/magical-object-details/magical-object-details.component';

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
  {
    path: 'magical-objects/details/:id',
    component: MagicalObjectDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'magical-objects/create',
    component: CreateMagicalObjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'magical-objects/edit/:id',
    component: EditMagicalObjectComponent,
    canActivate: [AuthGuard],
  },
];
