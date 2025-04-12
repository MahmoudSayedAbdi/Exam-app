'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NavgitToQuestions({examId} : {examId:string}) {

    const router = useRouter()

    
  return (
    <Button onClick={()=>router.push(`/student/dashboard/questions/${examId}`)} className='py-1 px-6 rounded-[20px] hover:text-primary'> Start</Button>

  )
}
