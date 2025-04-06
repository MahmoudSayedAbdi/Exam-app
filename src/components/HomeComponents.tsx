'use client'
import React from 'react'
import { Button } from "@/components/ui/button";
import { History, LayoutDashboard, LogOut } from "lucide-react";
import Image from "next/image";
import finalLogo from "../../public/assets/Final Logo 1.png";
import { signOut } from "next-auth/react";

export default function HomeComponents() {
    return (
        <div className="flex flex-col   w-full max-w-60 p-8 gap-8    ">
            <Image src={finalLogo} className="p-2" alt="Final logo" />
            <Button
                type="button"
                className="w-full flex justify-between text-white hover:text-primary "
                onClick={() => window.location.href = "/student/dashboard"}>
                <LayoutDashboard className="text-text-[#696F79]" />
                <p className=" align-middle"> Dashboard</p>
            </Button>
            <Button
                type="button"
                className="w-full text-primary  flex justify-between bg-transparent shadow-none hover:shadow"
                onClick={() => window.location.href = "/student/quiz"}>
                <History />
                <p className="align-middle">Quiz History</p>
            </Button>
            <Button
                type="button"
                className="w-full text-primary  flex justify-between bg-transparent shadow-none hover:shadow"
                onClick={ ()=>signOut({callbackUrl:"/auth/signin"}) }>
                <LogOut />
                <p className="align-middle">Log Out</p>
            </Button>

        </div>
    )
}
