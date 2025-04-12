import React from 'react'
import FrameImg from '../../../../public/assets/Frame 40.png'
import Image from 'next/image'
import { ProgressDemo } from '@/components/Progress'
import { CircleChevronDown, Flag, Timer } from 'lucide-react'
import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import ButtunNavgit from '../../@student/dashboard/_components/ButtunNavgit'

type subject = {
  _id: string,
  name: string,
  icon: string,
  createdAt: string
}

export default async function dashboard() {

  const authCookies = cookies().get('next-auth.session-token')?.value;
  const token = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: authCookies
  });

  // console.log(token)
  const respone = await fetch(`${process.env.NEXT_PUBLIC_API}/subjects`, {
    headers: {
      token: `${token?.token}`,
    },
  });

  const pyload = await respone.json()

  return (
    <div>
      <div className="info  shadow-xl rounded-[20px]  px-4 py-8 ">
        <div className="grid grid-cols-4 md:grid-cols-1 gap-14">
          <div className="">
            <Image src={FrameImg} alt={'frame image'} className='w-[216px]' />
          </div>

          <div className="col-span-3 flex flex-col gap-6 ">

            <div className="flex flex-col gap1 ">
              <h4 className='text-primary  font-bold text-[32px]'>Ahmed Mohamed</h4>     {/* here get name from token by cookies().get  (letarly)  */}
              <p className='font-normal text-xl text-[#979CA3]'>Voluptatem aut</p>
            </div>

            <ProgressDemo value={60} /> {/** value get from backend Api  */}

            <div className="flex gap-7">
              {/* Quiz Passed */}
              <div className="flex  gap-4">
                <div className="w-[70px] h-[70px] shadow-xl flex justify-center items-center  rounded  ">
                  {/* <Image src={FlagIcon} alt='Flag Icon' className='w-8 h-8 p-1  '/> */}
                  <Flag className='w-10 h-10 p-1  text-primary ' />
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-[29px] font-bold text-[#696F79]'>27</p>
                  <p className='text-[#696F79]'>Quiz Passed</p>
                </div>
              </div>
              {/* Fastert Time */}
              <div className="flex  gap-4">
                <div className="w-[70px] h-[70px] shadow-xl flex justify-center items-center  rounded  ">
                  {/* <Image src={FlagIcon} alt='Flag Icon' className='w-8 h-8 p-1  '/> */}
                  <Timer className='w-10 h-10 p-1  text-primary ' />
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-[29px] font-bold text-[#696F79]'>13 min</p>
                  <p className='text-[#696F79]'>Fastert Time</p>
                </div>
              </div>
              {/* Correct Answers */}
              <div className="flex  gap-4">
                <div className="w-[70px] h-[70px] shadow-xl flex justify-center items-center  rounded  ">
                  {/* <Image src={FlagIcon} alt='Flag Icon' className='w-8 h-8 p-1  '/> */}
                  <CircleChevronDown className='w-10 h-10 p-1  text-primary ' />
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-[29px] font-bold text-[#696F79]'>200</p>
                  <p className='text-[#696F79]'>Correct Answers</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="quizes shadow-xl rounded-[20px] flex flex-col gap-6  px-4 py-8">
        <div className='flex justify-between text-primary font-medium text-2xl'>
          <p>Quizes</p>
          <p>View All</p>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-3 gap-[20.27px]">

          {pyload.subjects.map((subject: subject) => {
            return (
              <div className="w-full relative rounded-[8px] overflow-hidden">
              <Image src={subject.icon} width={300} height={300} className='w-full' alt='Front end' />
              <div className="absolute top-[70%] inset-x-[10%] text-white p-4 rounded-[8.44px] bg-[#1935CA66] backdrop-blur-[27px]  ">
                <p className='font-bold text-[13.5px]'>{subject.name}</p>
                <p className='font-medium text-[11.82px]'>Voluptatem aut ut dignissimos blanditiis</p>
              </div>
              <ButtunNavgit subject = {subject._id}/>
            </div>
            )
          })}



        </div>
      </div>

    </div>
  )
}
