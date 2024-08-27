import { createReducer, on } from "@ngrx/store";
import { AuthStateType } from "../../models/auth";
import { signIn, signInFailure, signInSuccess, signInWithGoogle, signInWithGoogleFailure, signInWithGoogleSuccess, signOut, signOutFailure, signOutSuccess, signUp, signUpFailure, signUpSuccess } from "../actions/auth.actions";

const initialState: AuthStateType = { user: null, message: "", error: null, loading: false }

export const authReducer = createReducer(
    initialState,
    on(signUp, (state, action) => {
        return { ...state, loading: true }
    }),
    on(signUpSuccess, (state, { user, message }) => {
        return { ...state, user, message, loading: false }
    }),
    on(signUpFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(signIn, (state, action) => {
        return { ...state, loading: true }
    }),
    on(signInSuccess, (state, { user, message }) => {
        return { ...state, user, message, loading: false }
    }),
    on(signInFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(signOut, (state, action) => {
        return { ...state, loading: true }
    }),
    on(signOutSuccess, (state, { message }) => {
        return { ...state, message, loading: false }
    }),
    on(signOutFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(signInWithGoogle, (state, action) => {
        return { ...state, loading: true }
    }),
    on(signInWithGoogleSuccess, (state, { user, message }) => {
        return { ...state, user, message, loading: false }
    }),
    on(signInWithGoogleFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    })
)