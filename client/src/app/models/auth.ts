export interface Auth {
    _id?: string,
    name: string,
    email: string,
    phone: number,
    password: string,
    cpassword: string,
    username?: string
}

export interface Login {
    _id?: string,
    name: string,
    username: string
}

export interface AuthStateType {
    user: Auth | Login | null,
    message: string,
    error: string | null,
    loading: boolean
}
