import React from 'react'
import { Command, CommandInput } from './ui/command'
import QuizButton from './QuizButton'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function SearchComponenet() {
  return (
    <div className="search flex space-x-4 ">
    {/* search Input */}
    <Command className='shadow-xl '>
      <CommandInput placeholder="Search Quiz" />
    </Command>

    {/*  Go to Quiz button  */}
    <QuizButton />

    {/* Avatar */}
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
  )
}
