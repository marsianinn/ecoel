"use client";

import Image from "next/image";


interface Props {
  threadId: string;
}

function ShareThread({threadId}: Props) {

  function copyThread() {
    navigator.clipboard.writeText(threadId)
    alert('Ссылка на пост скопирована в буфер обмена')
  }

  return (
    <Image
      src='/assets/repost.svg'
      alt='share'
      width={24}
      height={24}
      className='cursor-pointer object-contain'
      onClick={() => copyThread()}
    />
  )
}

export default ShareThread;
