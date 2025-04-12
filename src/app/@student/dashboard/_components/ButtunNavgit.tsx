'use client'

import { useRouter } from "next/navigation"

export default function ButtunNavgit({subject} : {subject:string}) {

    const router = useRouter()

    
  return (
    <button onClick={()=>router.push(`/dashboard/quizes/${subject}`)} className="border-none absolute inset-0">
      
    </button>
  )
}
