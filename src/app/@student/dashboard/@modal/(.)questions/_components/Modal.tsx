'use client'


export default function Modal({ children }: { children: React.ReactNode }) {

    return (
        <div className="fixed inset-0 z-10 w-screen h-screen shadow-xl bg-black bg-opacity-50 overflow-y-auto flex justify-center items-center">
            <div className="flex flex-col gap-12  w-[686px] bg-white items-end justify-center p-6 text-center sm:items-center  rounded-[20px]">
                {children}
            </div>
        </div>
    )
}
