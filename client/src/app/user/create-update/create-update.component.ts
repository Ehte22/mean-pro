import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { CustomVlidators } from '../../custom-validator/custom.validator';
import { Store } from '@ngrx/store';
import { User, UserStateType } from '../../models/user';
import { createUser, getUsers, updateUser } from '../../ngrx/actions/user.actions';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.css'
})
export class CreateUpdateComponent implements OnInit {
  imgUrl: string = "http://localhost:5000/public/"
  userForm: FormGroup = new FormGroup({})
  selectedUserData: User | null = null
  genders = [
    { id: "male", value: "male", display: "Male" },
    { id: "female", value: "female", display: "Female" }
  ]
  remove?: File
  profileImageUrl: string | File | null = null
  errorMessage: string | null = null




  constructor(
    private activeateRoutes: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<{ user: UserStateType }>,
    private userService: UserService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fname: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$"), CustomVlidators.noSpaceAllowed]],
      lname: ["doe", [Validators.required, CustomVlidators.noSpaceAllowed]],
      email: ["john@gmail.com", [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      phone: ["9898989898", [Validators.required, Validators.pattern("^[6-9]{1}\\d{9}$")]],
      gender: ["male", Validators.required],
      status: ["active", Validators.required],
      profile: ["", Validators.required],
      location: ["new york", Validators.required],
    })

    this.editUser()

    // const id = this.activeateRoutes.snapshot.params?.['id'];

    // this.store.select(state => state.user.users).subscribe((data) => {

    //   const selectedData = data.find(item => item._id === id)
    //   console.log(selectedData);

    // })

  }


  handleChange(e: Event) {
    const { files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.profileImageUrl = event.target.result;
      };

      reader.readAsDataURL(file);

      this.userForm.patchValue({
        profile: file
      });
      this.userForm.get('profile')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.selectedUserData) {
        this.updateUser()
      } else {
        this.createUser()
      }
    } else {
      this.userForm.markAllAsTouched()
      Swal.fire({
        icon: "error",
        title: "Opps",
        text: "All Fields Are Required"
      })
    }
  }

  validateFields(field: string) {
    return this.userForm.get(field)?.touched && this.userForm.get(field)?.errors ? "is-invalid" : ""
  }

  createUser() {
    const formData = new FormData();
    Object.keys(this.userForm.controls).forEach(key => {
      formData.append(key, this.userForm.get(key)?.value);
    });
    this.store.dispatch(createUser({ userData: formData }))
  }

  editUser() {
    this.userService.users$.subscribe(selectedUser => {

      this.selectedUserData = selectedUser
      this.remove = selectedUser?.profile
      if (selectedUser) {
        this.userForm.patchValue({
          fname: selectedUser.fname,
          lname: selectedUser.lname,
          email: selectedUser.email,
          phone: selectedUser.phone,
          gender: selectedUser.gender,
          status: selectedUser.status,
          profile: selectedUser.profile,
          location: selectedUser.location,
        })

        this.profileImageUrl = `${this.imgUrl}${selectedUser.profile}`
      }

    })
  }

  updateUser() {
    if (this.selectedUserData && this.selectedUserData._id) {
      const selectedUser = { ...this.userForm.value, remove: this.remove }


      const formData = new FormData();
      Object.keys(selectedUser).forEach(key => {
        if (!formData.has(key)) {
          formData.append(key, selectedUser[key]);
        }
      });
      this.store.dispatch(updateUser({ selectedUser: formData, userId: this.selectedUserData?._id, showSuccessModel: true }))
    }
    this.userForm.reset()
  }





}
