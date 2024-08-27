import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomVlidators } from '../../custom-validator/custom.validator';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { signUp } from '../../ngrx/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AuthStateType } from '../../models/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signUpForm: FormGroup = new FormGroup({})

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private store: Store<{ auth: AuthStateType }>
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$"), CustomVlidators.noSpaceAllowed]],
      email: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      phone: ["", [Validators.required, Validators.pattern("^[6-9]{1}\\d{9}$")]],
      password: ["", Validators.required],
      cpassword: ["", Validators.required],
    }, { validators: CustomVlidators.passwordMissMatch })
  }


  onSubmit() {
    if (this.signUpForm.valid) {
      this.store.dispatch(signUp({ userData: this.signUpForm.value }))
    } else {
      this.signUpForm.markAllAsTouched()
      this.toastr.error("All fields are required", "Error", {
        progressBar: true,
        closeButton: true,
        timeOut: 5000,
      })
    }

  }

  customValidator(value: string): string {
    return this.signUpForm.get(value)?.touched && this.signUpForm.get(value)?.invalid ? 'is-invalid' : ''
  }


}
