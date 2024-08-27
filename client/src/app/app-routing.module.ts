import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { protectedGuard } from './guards/protected.guard';

const routes: Routes = [
  { path: "", loadChildren: () => import("./auth/auth.module").then(mod => mod.AuthModule).catch(err => err), data: { title: "Auth" } },
  { path: "user", loadChildren: () => import("./user/user.module").then(mod => mod.UserModule).catch(err => err), data: { title: "User" } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
