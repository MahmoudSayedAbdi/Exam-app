import React from 'react'
import LandingAuth from '@/components/LandingAuth'
import NavAuth from '@/components/NavAuth'
import SocialButton from '@/components/SocialButton'
import SignUpForm from './_components/SignUp-Form'

export default function signUpPage() {
  console.log("this is Api" , process.env.NEXTAUTH_SECRET);
  return (
    <main className='grid  lg:grid-cols-2 h-screen grid-cols-1 '>
      {/* loanding */}
      <LandingAuth />
      {/* Sign Up */}
      <section className='grid grid-cols-1 gap-10  justify-self-center  pb-10 lg:pb-0  '>
        {/* nav auth */}
        <NavAuth />
        {/* Form Sign Up */}
        <div>
          <SignUpForm></SignUpForm>
          <SocialButton />
        </div>
      </section>

    </main>
  )
}








