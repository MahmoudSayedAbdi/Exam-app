// import { User } from "next-auth";

// export type LoginResponse = Pick<User, "token" | "user">;

// export type RegisterResponse = Pick<User, "token" | "user">;

declare type  ApplicationUser =  {
    _id: string,
    createdAt :string
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
}
export type LoginResponse = {
    token : string,
    user : ApplicationUser
}