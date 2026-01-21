import React from 'react'
import Tabbtn from '../Component/btns/Tabbtn'


const ResultPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center'>
      <div className='mt-6'>
        <p className='text-3xl'>ผลการคัดกรองโรค</p>
      </div>
      <div className='mt-2'>
        <div className=' sm:w-80 sm:h-80 border-3 border-green-800 rounded-xl overflow-hidden'>
          <img className=' h-full w-full object-cover' src="../public/skin-rash.jpg" alt="" />
        </div>
        <div className='flex flex-col items-center mt-4 gap-3'>
          <Tabbtn label='มะเร็งร้ายแรง 97%'/>
          <Tabbtn label='ไฝ/ปาน 35%'/>
          <Tabbtn label='รอยโรคก่อนมะเร็ง 35%'/>
          <Tabbtn label='รอยโรคไม่ร้ายแรงอื่น ๆ 22%'/>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
