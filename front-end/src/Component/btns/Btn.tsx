import React from 'react'
interface btnProps {
    text: string;
    href: string;
}
const btn = (props: btnProps) => {
  return (
    <button className='px-8 py-2 rounded-md Buttoncustom text-white cursor-pointer hover:shadow-lg  '><a href={props.href}>{props.text}</a></button>
  )
}

export default btn
