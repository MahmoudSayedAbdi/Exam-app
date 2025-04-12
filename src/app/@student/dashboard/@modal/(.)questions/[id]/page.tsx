import React from 'react'
import Modal from '../_components/Modal'
import { Button } from '@/components/ui/button'
import { constants } from 'buffer'
import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

export default async function questions({ params }: { params: { id: string } }) {

  const Id = params.id;

  
    const authCookies = cookies().get('next-auth.session-token')?.value
    const token = await decode({
      secret: process.env.NEXTAUTH_SECRET!,
      token: authCookies
    })
  
    const respone = await fetch(`${process.env.NEXT_PUBLIC_API}/questions?exam=${Id}`, {
      headers: {
        token: `${token?.token}`,
      },
    })
  
    const data = await respone.json()

  return (
    <>
      <Modal>
        <>
          <div className='flex flex-col gap-4'>
            <p className='font-bold'>Instructions {Id}</p>
            <ul >
              <li className='list-disc'>Lorem ipsum dolor sit amet,  elit. Recusandae, mollitia!</li>
              <li className='list-disc'>Lorem ipsum dolor sit amet,  elit. Recusandae, mollitia!</li>
              <li className='list-disc'>Lorem ipsum dolor sit amet,  elit. Recusandae, mollitia!</li>
              <li className='list-disc'>Lorem ipsum dolor sit amet,  elit. Recusandae, mollitia!</li>
            </ul>
          </div>

          <Button className='w-full rounded-[100px] hover:text-primary' >Start</Button>

        </>
      </Modal>
    </>
  )
}
