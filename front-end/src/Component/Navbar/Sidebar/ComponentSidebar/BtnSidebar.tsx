import React from 'react'
interface BtnSidebarProps {
  href: string;
  label: string;
}

const BtnSidebar = ({ href, label }: BtnSidebarProps) => {
  return (
    <div>
      <a href={href} className="text-xl block px-4 py-2 rounded hover:bg-green-500 focus:bg-green-800">
        {label}
      </a>
    </div>
  )
}

export default BtnSidebar
