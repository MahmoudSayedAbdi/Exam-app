import Link from 'next/link'
import React from 'react'

export default function NavAuth() {
    return (
        <div className='right-20 text-primary  flex justify-end w-full items-center'>

            <form >
                <select id="countries" className="text-black p-3 rounded-xl   text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="US">English</option>
                    <option value="Ar">Arabic</option>
                    <option value="FR">France</option>
                </select>
            </form>

            <Link className='mx-2 font-bold' href={"/auth/signin"}>sign in </Link>
            <Link className='rounded-xl mx-2 border p-3 ' href={"/auth/signup"}>Register </Link>
        </div>
    )
}
