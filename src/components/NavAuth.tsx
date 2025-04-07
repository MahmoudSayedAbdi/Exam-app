import Link from 'next/link'
import React from 'react'
import { ComboboxDemo } from './Combobox'

export default function NavAuth() {
    return (
        <div className='right-20 text-primary  flex justify-end w-full items-center'>

            <div className='mr-5'>
                <ComboboxDemo/>
            </div>

            <Link className='mx-2 font-bold' href={"/auth/signin"}>sign in </Link>
            <Link className='rounded-xl mx-2 border p-3 ' href={"/auth/signup"}>Register </Link>
        </div>
    )
}
