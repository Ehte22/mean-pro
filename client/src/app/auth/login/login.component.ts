import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthStateType } from '../../models/auth';
import { signIn, signInWithGoogle } from '../../ngrx/actions/auth.actions';
import { AuthService } from '../../services/auth.service';
declare const google: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signInForm: FormGroup = new FormGroup({})

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ auth: AuthStateType }>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    })


    google.accounts.id.initialize({
      client_id: '195321382919-9douqjni4u680jkitrc9ri8o6nvuvt8m.apps.googleusercontent.com',
      callback: (res: any) => this.handleLogin(res)
    });

    google.accounts.id.renderButton(
      document.getElementById('google-btn'),
      { theme: 'outline', size: 'large', shape: 'rectangle', width: 50 }
    );


    // google.accounts.id.prompt()
  }


  onSubmit() {
    if (this.signInForm.valid) {
      console.log(this.signInForm.value)
      this.store.dispatch(signIn({ userData: this.signInForm.value }))
    } else {
      this.signInForm.markAllAsTouched()
    }

  }

  customValidator(value: string): string {
    return this.signInForm.get(value)?.touched && this.signInForm.get(value)?.invalid ? 'is-invalid' : ''
  }

  handleLogin(res: any) {
    if (res) {
      this.signInWithGoogle(res)
    }
  }

  signInWithGoogle(token: string): void {
    this.store.dispatch(signInWithGoogle({ googleData: token }))
    // this.authService.sendTokenToBackend(token)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //     },
    //     error: (err) => {
    //       console.log(err);

    //     }
    //   })
  }

}
