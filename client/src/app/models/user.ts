
export interface User {
    _id?: string,
    fname: string,
    lname: string,
    email: string,
    phone: string,
    gender: string,
    status: string,
    profile: File,
    location: string
    remove?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface UserStateType {
    users: User[]
    message: string,
    page: number,
    limit: number,
    total: number,
    error: string | null
    loading: boolean
}
