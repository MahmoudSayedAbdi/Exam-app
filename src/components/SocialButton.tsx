import Image from 'next/image'
import React from 'react'
import FacebookIcon from '../../public/assets/Logo-1.png'
import AppleIcon from '../../public/assets/Logo-2.png'
import Xicon from '../../public/assets/Logo.png'
import Googleicon from '../../public/assets/Logo Google.png'
 

export default function SocialButton() {
    return (
        <>
            <div className="grid grid-cols-3 mt-7 items-center">
                <div className="w-full border-t border-gray-300 "></div>
                <span className="px-4 text-gray-500 text-sm">Or Continue with</span>
                <div className="w-full border-t border-gray-300 "></div>
            </div>
            <div className='grid grid-cols-4 mt-7 items-center gap-8 '>
                <div className='w-[65px] h-[65px] shadow border-[1.02px] bg-white dark:bg-secondary  p-[19.48px] rounded-2xl '>
                    <Image src={FacebookIcon} alt='FacebookIcon'></Image>
                </div>
                <div className='w-[65px] h-[65px] shadow border-[1.02px] bg-white dark:bg-secondary  p-[19.48px] rounded-2xl  '>
                    <Image src={AppleIcon} alt='AppleIcon'></Image>
                </div>
                <div className='w-[65px] h-[65px] shadow border-[1.02px] bg-white dark:bg-secondary p-[19.48px] rounded-2xl  '>
                    <Image src={Xicon} alt='Xicon'></Image>
                </div>
                <div className='w-[65px] h-[65px] shadow border-[1.02px] bg-white dark:bg-secondary p-[19.48px] rounded-2xl  '>
                    <Image src={Googleicon} alt='Googleicon'></Image>
                </div>
            </div>
        </>

    )
}
