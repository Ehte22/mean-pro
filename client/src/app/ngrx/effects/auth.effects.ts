import { Actions, createEffect, ofType } from "@ngrx/effects";
import { signIn, signInFailure, signInSuccess, signInWithGoogle, signInWithGoogleFailure, signInWithGoogleSuccess, signOut, signOutFailure, signOutSuccess, signUp, signUpFailure, signUpSuccess } from "../actions/auth.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthEffects {
    constructor(
        private $action: Actions,
        private authService: AuthService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    _signUp = createEffect(() =>
        this.$action.pipe(
            ofType(signUp),
            mergeMap(({ userData }) => {
                return this.authService.signUp(userData).pipe(
                    map(({ result, message }) => {
                        this.toastr.success("SignUp Success", "Success")
                        this.router.navigate(['/'])
                        return signUpSuccess({ user: result, message })
                    }),
                    catchError((error) => {
                        this.toastr.error(error.error.message, "Error", {
                            timeOut: 5000,
                            closeButton: true,
                            progressBar: true
                        })
                        return of(signUpFailure({ error: error.message }))
                    })
                )
            })
        )
    )

    _signIn = createEffect(() =>
        this.$action.pipe(
            ofType(signIn),
            mergeMap(({ userData }) => {
                return this.authService.signIn(userData).pipe(
                    map(({ result, message }) => {
                        localStorage.setItem("auth", JSON.stringify(result))
                        this.toastr.success("Login Success", "Success")
                        this.router.navigate(['/user'])
                        return signInSuccess({ user: result, message })
                    }),
                    catchError((error) => {
                        this.toastr.error(error.error.message, "Error", {
                            timeOut: 5000,
                            closeButton: true,
                            progressBar: true
                        })
                        return of(signInFailure({ error: error.message }))
                    })
                )
            })
        )
    )

    _signOut = createEffect(() =>
        this.$action.pipe(
            ofType(signOut),
            mergeMap((action) => {
                return this.authService.signOut().pipe(
                    map(({ message }) => {
                        localStorage.removeItem("auth")
                        this.toastr.success("Logout Success", "Success")
                        this.router.navigate(['/'])
                        return signOutSuccess({ message })
                    }),
                    catchError((error) => {
                        this.toastr.error(error.error.message, "Error", {
                            timeOut: 5000,
                            closeButton: true,
                            progressBar: true
                        })
                        return of(signOutFailure({ error: error.message }))
                    })
                )
            })
        )
    )

    _signInWithGoogle = createEffect(() =>
        this.$action.pipe(
            ofType(signInWithGoogle),
            mergeMap(({ googleData }) => {
                return this.authService.signInWithGoogle(googleData).pipe(
                    map(({ result, message }) => {
                        localStorage.setItem("auth", JSON.stringify(result))
                        this.router.navigate(['/user'])
                        this.toastr.success("User Login Success", "Success")
                        return signInWithGoogleSuccess({ user: result, message })
                    }),
                    catchError((error) => {
                        this.toastr.error(error.error.message, "Error", {
                            timeOut: 5000,
                            closeButton: true,
                            progressBar: true
                        })
                        return of(signInWithGoogleFailure({ error: error.message }))
                    })
                )
            })
        )
    )
}