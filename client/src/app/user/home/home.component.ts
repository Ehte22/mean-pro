import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User, UserStateType } from '../../models/user';
import { deleteUser, getUsers, updateUser } from '../../ngrx/actions/user.actions';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  imgUrl: string = "http://localhost:5000/public/"
  allUsers: User[] = []
  searchUser: string = ""
  filterGender: string = "all"
  filterStatus: string = "all"
  sortByOrder: string = "desc"
  currentPage: number = 1
  limit: number = 5
  total: number = 0

  pages: number[] = [];

  constructor(
    private store: Store<{ user: UserStateType }>,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  handleChange(e: Event) {
    const input = e.target as HTMLInputElement
    if (input.type === "search") {
      this.searchUser = input.value.toLowerCase()
    } else if (input.name === "gen") {
      this.filterGender = input.value
    } else if (input.name === "status") {
      this.filterStatus = input.value
    }
    this.currentPage = 1
    this.getUsers()
  }

  sortByDate(order: string) {
    this.sortByOrder = order;
    this.getUsers()
  }


  getUsers() {
    this.store.dispatch(getUsers({
      page: this.currentPage,
      limit: this.limit,
      searchUser: this.searchUser,
      filterByGender: this.filterGender,
      filterByStatus: this.filterStatus,
      sortByOrder: this.sortByOrder
    }))
    this.store.select(state => state.user).subscribe(data => {
      this.allUsers = data.users

      this.total = data.total
      this.currentPage = data.page

      this.total = Math.ceil(this.total / this.limit)
      this.pages = Array.from(Array(this.total), (_, i) => i + 1)

      console.log(this.allUsers);
    })
  }

  getUserDetails(user: User) {
    this.userService.getUserDetails(user)
    this.router.navigate(['/user/user-details'])
  }

  deleteUser(id: string) {
    this.store.dispatch(deleteUser({ id }))
    this.getUsers()
  }

  editUser(userData: User) {
    this.userService.editUser(userData)
    this.router.navigate([`/update/${userData._id}`])
  }

  updateStatus(user: User, status: string) {
    if (user.status !== status) {
      const updateStatus = { ...user, status }
      const fd = new FormData()
      fd.append('status', status)

      if (user._id) {
        this.store.dispatch(updateUser({ selectedUser: fd, userId: user._id, showSuccessModel: false }))

        this.store.select(state => state.user).subscribe(data => {
          if (data.users) {
            this.allUsers = this.allUsers.map(u => u._id === user._id ? updateStatus : u);
          }
        });
      }
    }
    this.getUsers()
  }


  nextPage() {
    if (this.currentPage < this.total) {
      this.currentPage++;
      this.getUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUsers();
    }
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.total) {
      this.currentPage = page;
      this.getUsers();
    }
  }
}
