import React from 'react'
import Tabbtn from '../Component/btns/Tabbtn';
const Home = () => {
  return (
    <div className='min-h-screen flex flex-col items-center mt-6'>
<div
  className="
    relative left-0 -top-10
    -ml-[50vw] -mr-[50vw]
    w-screen h-[194px] md:h-[240px]
    bg-center bg-cover
  "
  style={{ backgroundImage: "url('/skin-rash.jpg')" }}
/>
      <Tabbtn label="Home"  muted={false} />
      
    </div>
  )
}

export default Home;