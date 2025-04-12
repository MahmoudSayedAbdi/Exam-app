import React from 'react'
import HtmlIcon from "../../../../../../public/assets/HtmlIcon.png"
import Image from 'next/image'
import { cookies } from 'next/headers'
import { decode } from 'next-auth/jwt'
import NavgitToQuestions from './_components/NavgitToQuestions'

type exam = {
  _id: string,
  title: string,
  duration: number,
  subject: string,
  numberOfQuestions: number,
  active: boolean,
  createdAt: string
}

export default async function quizes({ params }: { params: { id: string } }) {

  const quizesId = params.id;

  const authCookies = cookies().get('next-auth.session-token')?.value
  const token = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: authCookies
  })

  const respone = await fetch(`${process.env.NEXT_PUBLIC_API}/exams?subject=${quizesId}`, {
    headers: {
      token: `${token?.token}`,
    },
  })


  const data = await respone.json()
  // console.log(pyload)


  return (
    <div className='flex flex-col gap-10'>
      <div className="diploma flex flex-col gap-6">
        <p>Front End Quiz</p>   {/** From Back End */}

        {data.exams.map((exam: exam) => {
          return <div className=" shadow-xl py-4 px-6 rounded-[10px] flex gap-6 ">
            <div className="icon w-[70px] h-[70px ">
              <Image src={HtmlIcon} alt="html icon" />
            </div>
            <div className="flex justify-between gap-4 w-full text-[#0F0F0F] ">
              <div className='flex flex-col gap-1'>
                <p className='font-medium'>{exam.title}</p>
                <p className='text-[13px] text-[#535353]'>20 Question</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className='text-[13px] '>15 Minutes</p>
                <NavgitToQuestions examId = {exam._id}/>
              </div>
            </div>

          </div>
        })}

      </div>

    </div>
  )
}
