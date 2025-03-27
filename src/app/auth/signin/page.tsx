import React from 'react'
import NavAuth from '@/components/NavAuth'
import SocialButton from '@/components/SocialButton'
import LandingAuth from '@/components/LandingAuth'
import LoginForm from './_components/Login-Form'

export default function signInPage() {
  return (
    <main className='grid  lg:grid-cols-2 h-screen grid-cols-1 '>
      {/* loanding */}
      <LandingAuth />
      {/*  Sign in */}
      <section className='grid grid-cols-1 gap-10  justify-self-center  pb-10 lg:pb-0    '>
        {/* nav auth */}
        <NavAuth />
        {/* Form Sign in */}
        <div>
          <LoginForm></LoginForm>
          <SocialButton />
        </div>
      </section>
    </main>
  )
}
