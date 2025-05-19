import React from 'react'
import { Message } from '../model/types/message'

interface MessageCardProps {
  message: Message
}

export const MessageCard = ({ message }: MessageCardProps) => {
  return (
    <p>{message.message}</p>
  )
}
