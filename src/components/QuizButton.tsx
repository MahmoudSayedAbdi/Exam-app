'use client'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'


export default function QuizButton() {
  const router =  useRouter()
  return (
    <div>
      <Button
        className='flex justify-between text-white hover:text-primary'
        size={'2xl'}
        onClick={()=> router.push('/student/quizes')}
        >
        Start Quiz
      </Button>
    </div>
  )
}
