import { createReducer, on } from "@ngrx/store";
import { UserStateType } from "../../models/user";
import { createUser, createUserFailure, createUserSuccess, deleteUser, deleteUserFail, deleteUserSuccess, getUsers, getUsersFail, getUsersSuccess, updateUser, updateUserFail, updateUserSuccess } from "../actions/user.actions";


const initialState: UserStateType = { users: [], message: "", page: 1, limit: 5, total: 0, error: null, loading: false }
export const userReducer = createReducer(
    initialState,
    on(createUser, (state, action) => {
        return { ...state, loading: true }
    }),
    on(createUserSuccess, (state, { user, message }) => {
        return { ...state, users: [...state.users, user], message, loading: false }
    }),
    on(createUserFailure, (state, { error }) => {
        return { ...state, error: error, loading: false }
    }),

    on(getUsers, (state, action) => {
        return { ...state, loading: true }
    }),
    on(getUsersSuccess, (state, { users, message, page, limit, total, }) => {
        return { ...state, users, page, limit, total, message, loading: false }
    }),
    on(getUsersFail, (state, { error }) => {
        return { ...state, error }
    }),

    on(updateUser, (state, action) => {
        return { ...state, loading: true }
    }),
    on(updateUserSuccess, (state, { selectedUser, message, userId }) => {
        const x = state.users.map(item => item._id === userId ? selectedUser : item)
        return { ...state, message }
    }),
    on(updateUserFail, (state, { error }) => {
        return { ...state, error }
    }),

    on(deleteUser, (state, action) => {
        return { ...state, loading: true }
    }),
    on(deleteUserSuccess, (state, { id, message }) => {
        const x = state.users.filter(item => item._id !== id)
        return { ...state, users: x, message }
    }),
    on(deleteUserFail, (state, { error }) => {
        return { ...state, error }
    })

)