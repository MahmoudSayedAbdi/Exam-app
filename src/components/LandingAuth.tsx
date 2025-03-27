import React from 'react'
import loadingImg from '../../public/assets/bro.png'
import Image from 'next/image'

export default function LandingAuth() {
  return (
    <section className='bg-secondary mb-10 lg:my-0  lg:rounded-r-[100px] rounded-b-[100px]  flex justify-center items-center'>
    <div className=' flex flex-col items-start   m-20'>

      <div className='  dark:text-gray-700 '>
        <h2 className='text-[50px] font-bold  '>Welcome to <br /> <span className='text-primary text-6xl'>Elevate</span></h2>
        <p className='text-lg leading-10 '>Quidem autem voluptatibus qui quaerat aspernatur architecto natus</p>
      </div>

      <div className=' mt-20'>
        <Image  src={loadingImg} alt='loanding image' />
      </div>

    </div>
  </section>
  )
}
