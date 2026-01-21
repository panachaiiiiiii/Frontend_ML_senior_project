import React from 'react'
interface btnProps {
    text: string;
    href?: string;
    onClick?: ()=>void;
}
const Btn = (props: btnProps) => {
  return (
    <button type="button" onClick={props.onClick} className='Buttoncustom'><a href={props.href}>{props.text}</a></button>
  )
}

export default Btn
