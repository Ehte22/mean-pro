import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user.service";
import { createUser, createUserFailure, createUserSuccess, deleteUser, deleteUserFail, deleteUserSuccess, getUsers, getUsersFail, getUsersSuccess, updateUser, updateUserFail, updateUserSuccess } from "../actions/user.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class UserEffect {

    constructor(
        private action$: Actions,
        private userService: UserService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    _createUser = createEffect(() =>
        this.action$.pipe(
            ofType(createUser),
            mergeMap(({ userData }) => {
                return this.userService.createUser(userData).pipe(
                    map(({ message, result }) => {
                        Swal.fire({
                            icon: "success",
                            title: "Create User Success"
                        }).then(() => {
                            this.router.navigate(['user'])
                        })
                        return createUserSuccess({ message, user: result })
                    }),
                    catchError(({ error }) => {
                        this.toastr.error(error.message, "Error", {
                            timeOut: 5000,
                            closeButton: true,
                            progressBar: true,
                        })
                        return of(createUserFailure({ error: error.message }))
                    })
                )
            }),
        )
    )

    _getUsers = createEffect(() =>
        this.action$.pipe(
            ofType(getUsers),
            mergeMap(({ page, limit, searchUser, filterByGender, filterByStatus, sortByOrder }) => {
                return this.userService.getUsers(page, limit, searchUser, filterByGender, filterByStatus, sortByOrder).pipe(
                    map(({ result, message, page, limit, total }) => {
                        return getUsersSuccess({ users: result, message, page, limit, total })
                    }),
                    catchError((error) => of(getUsersFail({ error: error.message })))
                )
            })
        )
    )

    _deleteUser = createEffect(() =>
        this.action$.pipe(
            ofType(deleteUser),
            mergeMap(({ id }) => {
                return this.userService.deleteUser(id).pipe(
                    map(({ message }) => {
                        Swal.fire({
                            icon: "success",
                            title: "Delete User Success"
                        })
                        return deleteUserSuccess({ id, message })
                    }),
                    catchError((error) => of(deleteUserFail({ error: error.message })))
                )
            })
        )
    )

    _updateUser = createEffect(() =>
        this.action$.pipe(
            ofType(updateUser),
            mergeMap(({ selectedUser, userId, showSuccessModel }) => {
                return this.userService.updateUser(selectedUser, userId).pipe(
                    map(({ message }) => {
                        if (showSuccessModel) {
                            Swal.fire({
                                icon: "success",
                                title: "Update User Success"
                            }).then(() => {
                                this.router.navigate(['/user'])
                            })
                        }
                        return updateUserSuccess({ selectedUser, userId, message })
                    }),
                    catchError((error) => of(updateUserFail({ error: error.message })))
                )
            })
        )
    )
}