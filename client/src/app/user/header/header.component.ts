import { Component } from '@angular/core';
import { AuthStateType } from '../../models/auth';
import { Store } from '@ngrx/store';
import { signOut } from '../../ngrx/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private store: Store<{ auth: AuthStateType }>
  ) { }

  signOut() {
    this.store.dispatch(signOut())
  }
}
