import React from 'react'

export default function TextBarDetails({title="",text="",...props

}) {
  return (
    <div className='p-3 border-t border-white/70 flex gap-40'  {...props}>
        <span className='min-w-30'>{title}</span>
        <span>{text}</span>
    </div>
  )
}
