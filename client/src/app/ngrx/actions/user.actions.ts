import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user";

export const createUser = createAction("create user", props<{ userData: FormData }>())
export const createUserSuccess = createAction("create user success", props<{ user: User, message: string }>())
export const createUserFailure = createAction("create user fail", props<{ error: string }>())

export const getUsers = createAction("get users", props<{ page: number, limit: number, searchUser: string, filterByGender: string, filterByStatus: string, sortByOrder: string }>())
export const getUsersSuccess = createAction("get users success", props<{ users: User[], message: string, page: number, limit: number, total: number }>())
export const getUsersFail = createAction("get users fail", props<{ error: string }>())

export const updateUser = createAction("update users", props<{ selectedUser: FormData, userId: string, showSuccessModel: boolean }>())
export const updateUserSuccess = createAction("update users success", props<{ selectedUser: FormData, userId: string, message: string }>())
export const updateUserFail = createAction("update users fail", props<{ error: string }>())

export const deleteUser = createAction("delete users", props<{ id: string }>())
export const deleteUserSuccess = createAction("delete users success", props<{ id: string, message: string }>())
export const deleteUserFail = createAction("delete users fail", props<{ error: string }>())
