import React from 'react'
import { Emoji, EmojiProvider } from 'react-apple-emojis'
import emojiData from 'react-apple-emojis/src/data.json'

export default function Emoicon({ name, ...props }) {
  return (
    <span className=''  {...props}>
        <EmojiProvider data={emojiData}>
          <Emoji name={name}/>
        </EmojiProvider>
    </span>

  )
}

