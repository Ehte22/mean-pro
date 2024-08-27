import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  userDetail: User | null = null

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails() {
    this.userService.users$.subscribe((data) => {
      this.userDetail = data
    })
  }
}
