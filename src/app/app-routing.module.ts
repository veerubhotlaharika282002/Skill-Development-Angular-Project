import { CarsearchComponent } from './carsearch/carsearch.component';
import { ContactComponent } from './contact/contact.component';
import { DriverrentComponent } from './driverrent/driverrent.component';
import { RegularComponent } from './regular/regular.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: RegisterUserComponent},
  {path: 'regular', component: RegularComponent},
  {path: 'register-user', component: RegisterUserComponent},
  {path: 'carsearch', component: CarsearchComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'driverrent', component: DriverrentComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
