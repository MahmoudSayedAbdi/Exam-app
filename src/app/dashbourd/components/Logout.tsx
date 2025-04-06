"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { callbackify } from 'util';

export default function Logout() {

    const { data: session } = useSession();

    function onClick() {
        signOut({
            callbackUrl: "/auth/signin"
        }
        )
    }

    return (
        <div>
            <button className='bg-black text-white w-full' onClick={onClick} >
                click , {session?.user.username}
            </button>
        </div>
    )
}
