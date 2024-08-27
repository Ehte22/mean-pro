import { createAction, props } from "@ngrx/store";
import { Auth, Login } from "../../models/auth";

export const signUp = createAction("signup user", props<{ userData: Auth }>())
export const signUpSuccess = createAction("signup user success", props<{ user: Auth, message: string }>())
export const signUpFailure = createAction("signup user fail", props<{ error: string }>())

export const signIn = createAction("signin user", props<{ userData: Login }>())
export const signInSuccess = createAction("signin user success", props<{ user: Login, message: string }>())
export const signInFailure = createAction("signin user fail", props<{ error: string }>())

export const signOut = createAction("signout user")
export const signOutSuccess = createAction("signout user success", props<{ message: string }>())
export const signOutFailure = createAction("signout user fail", props<{ error: string }>())

export const signInWithGoogle = createAction("signin with google", props<{ googleData: string }>())
export const signInWithGoogleSuccess = createAction("signin with google success", props<{ user: Login, message: string }>())
export const signInWithGoogleFailure = createAction("signin with google fail", props<{ error: string }>())

