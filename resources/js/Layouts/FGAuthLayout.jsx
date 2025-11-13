import React from 'react'

export default function FGAuthLayout({children}) {
  return (
    <div className='max-h-screen flex flex-col justify-center items-center  bg-black border border-pink-300 py-0 sm:py-5 md:py-10 sm:px-10 md:px-20 px-0'>
        <div className=" w-full max-w-[100rem] h-full">
            {children}
        </div>
    </div>
  )
}
