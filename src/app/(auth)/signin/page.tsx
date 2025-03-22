import Image from 'next/image'
import React from 'react'
import loadingImg from '../../../../public/assets/bro.png'
import FacebookIcon from '../../../../public/assets/Logo-1.png'
import AppleIcon from '../../../../public/assets/Logo-2.png'
import Xicon from '../../../../public/assets/Logo.png'
import Googleicon from '../../../../public/assets/Logo Google.png'
import MyForm from './_components/FormSignIn'
import Link from 'next/link'
export default function page() {
  return (
    <main className='grid  lg:grid-cols-2 h-screen grid-cols-1 '>

      <section className='bg-secondary mb-10 lg:my-0  lg:rounded-r-[100px] rounded-none  flex justify-center items-center'>
        <div className=' flex flex-col items-start   m-20'>

          <div className='  '>
            <h2 className='text-[50px] font-bold '>Welcome to <br /> <span className='text-primary text-6xl'>Elevate</span></h2>
            <p className='text-lg leading-10 '>Quidem autem voluptatibus qui quaerat aspernatur architecto natus</p>
          </div>

          <div className=' mt-20'>
            <Image className='' src={loadingImg} alt='loanding image' />
          </div>
        </div>
      </section>

      <section className='flex flex-col justify-center items-center pb-10 lg:pb-0 relative '>
        <nav className='absolute top-20 right-20 text-primary'>
          
          <select name="lang" id="" className='text-black p-3 rounded-xl'>
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
          </select>
          <Link className='mx-2 ' href={"/signin"}>sign up </Link>
          <Link className='rounded-xl mx-2 border p-3 ' href={"/"}>Register </Link>
        </nav>

        <MyForm></MyForm>

        <div className="grid grid-cols-3 mt-7 items-center">
          <div className="w-full border-t border-gray-300 "></div>
          <span className="px-4 text-gray-500 text-sm">Or Continue with</span>
          <div className="w-full border-t border-gray-300 "></div>
        </div>

        <div className='grid grid-cols-4 mt-7 items-center gap-8'>
          <div className='shadow p-3 border-[1.02px] px-[21.52px] py-[19.48px] rounded-2xl '>
          <Image src={FacebookIcon} alt='FacebookIcon'></Image>
          </div>
          <div className='shadow p-3 border-[1.02px] px-[21.52px] py-[19.48px] rounded-2xl '>
          <Image src={AppleIcon} alt='AppleIcon'></Image>
          </div>
          <div className='shadow p-3 border-[1.02px] px-[21.52px] py-[19.48px] rounded-2xl '>
          <Image src={Xicon} alt='Xicon'></Image>
          </div>
          <div className='shadow p-3 border-[1.02px] px-[21.52px] py-[19.48px] rounded-2xl '>
          <Image src={Googleicon} alt='Googleicon'></Image>
          </div>
        </div>
        
      </section>

    </main>
  )
}
