import QuizButton from '@/components/QuizButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Command, CommandInput } from '@/components/ui/command'
import React from 'react'

export default function dashboard() {
  return (
    <div className="dashboard">

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

      <div className="info">
        
      </div>

    </div>
  )
}
