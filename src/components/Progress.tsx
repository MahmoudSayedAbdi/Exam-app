"use client"
 
import * as React from "react"
 
import { Progress } from "@/components/ui/progress"
 
export function ProgressDemo({value } : { value: React.SetStateAction<number>}) {

  const [progress, setProgress] = React.useState(13)
 
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500)
    return () => clearTimeout(timer)
  }, [])
 
  return <Progress value={progress} className="w-[70%] " />
}