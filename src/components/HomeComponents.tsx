'use client'
import React from 'react'
import { Button } from "@/components/ui/button";
import { History, LayoutDashboard, LogOut } from "lucide-react";
import Image from "next/image";
import finalLogo from "../../public/assets/Final Logo 1.png";
import { signOut } from "next-auth/react";

export default function HomeComponents() {
    return (
        <>
            <Image src={finalLogo} className="p-2" alt="Final logo" />
            <Button
            
                size={'2xl'}
                type="button"
                className="w-full flex justify-between text-white hover:text-primary "
                onClick={() => window.location.href = "/dashboard"}>
                <LayoutDashboard className="text-text-[#696F79]" />
                <p className=" align-middle"> Dashboard</p>
            </Button>
            <Button
                size={'2xl'}
                type="button"
                className="w-full text-primary  flex justify-between bg-transparent shadow-none hover:shadow"
                onClick={() => window.location.href = "/student/quizHistory"}>
                <History />
                <p className="align-middle">Quiz History</p>
            </Button>
            <Button
                size={'2xl'}
                type="button"
                className="w-full text-primary  flex justify-between bg-transparent shadow-none hover:shadow"
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
                <LogOut />
                <p className="align-middle">Log Out</p>
            </Button>

        </>
    )
}
