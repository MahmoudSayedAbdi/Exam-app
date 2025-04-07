import React from 'react'
import HomeComponents from './HomeComponents'

export default function Sidebar() {
  return (
    <div className='fixed flex flex-col border-r min-w-[300px] min-h-screen'>
      <div className='flex flex-col w-full max-w-80 p-8 gap-8 '>
      <HomeComponents/>
      </div>
    </div>
  )
}
