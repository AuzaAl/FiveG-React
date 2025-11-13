import React from 'react'

export default function GradientCard({children, color = "w", ...props}) {

    const ColorVariable = {
        blue :"from-blue-500/0 via-blue-400/30 to-blue-400/60 border-blue-300/50 hover:from-blue-500/0 hover:via-blue-500/30 hover:to-blue-400/60 hover:border-blue-500/80 transition-colors duration-300 ease-in-out cursor-pointer" ,
        red :"from-red-800/0 via-red-800/30 to-red-900/60 border-red-950/80 hover:to-red-700/60 hover:border-red-800/80 transition-colors duration-300 ease-in-out cursor-pointer",
        w :"from-neutral-500/0 via-neutral-500/30 to-neutral-500/60 border-neutral-500/80 hover:to-neutral-700/60 hover:border-neutral-500/80 transition-colors duration-300 ease-in-out cursor-pointer",
        b :"from-neutral-800/25 via-neutral-800/30 to-neutral-800/60 border-neutral-700/80 hover:to-neutral-700/60 hover:border-neutral-500/80 transition-colors duration-300 ease-in-out cursor-pointer",
    }

    return (
        <>
            <div className={`border h-35 ColoredGradient-Card bg-gradient-to-bl ${ColorVariable[color]} rounded-xl p-5`} {...props}>
                <div className="flex-col gap relative">
                    {children}
                </div>
            </div>
        </>
    )
}

