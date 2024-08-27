import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { CreateUpdateComponent } from './create-update/create-update.component';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { protectedGuard } from '../guards/protected.guard';

const routes: Routes = [
  {
    path: "", component: UserComponent, canActivate: [protectedGuard], children: [
      { path: "", component: HomeComponent, data: { title: "Home" } },
      { path: "register", component: CreateUpdateComponent, data: { title: "Register User" } },
      { path: "update/:id", component: CreateUpdateComponent, data: { title: "Update User" } },
      { path: "user-details", component: UserDetailComponent, data: { title: "User Details" } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
