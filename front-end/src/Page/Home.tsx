import React from 'react'
import Tabbtn from '../Component/btns/Tabbtn';
import { Slider } from 'antd';
import SliderCard from '../Component/SliderCard/SliderCard';
import CompletedModel from '../Component/CompletedModel/CompletedModel';
const Home = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className='min-h-screen flex flex-col items-center mt-6'>
<div
  className="
    relative left-0 -top-10
    -ml-[50vw] -mr-[50vw]
    w-screen h-[194px] md:h-[240px]
    bg-center bg-cover
    shadow-lg 
  "
  style={{ backgroundImage: "url('/skin-rash.jpg')" }}
/>

<div className='flex justify-start w-full'>
<p className='text-2xl font-bold text-green-700'>ข่าวสาร</p>
</div>

    <SliderCard />
      <Tabbtn label="Home"  muted={false} onClick={() => {setOpen(true)}}/>
      <CompletedModel open={open} onClose={() => setOpen(false)} label="ยืนยันการทำรายการ"/>

    </div>
  )
}

export default Home;