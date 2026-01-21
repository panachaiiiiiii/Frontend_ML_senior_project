import React, { useState } from 'react'

const ProfileFillForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = {
      firstName,
      lastName,
      gender,
      dob,
    }

    console.log("SUBMIT DATA:", formData)
    // 👉 ส่ง API / เก็บ DB / ไปหน้าถัดไป
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-full max-w-[800px] md:bg-white md:border border-black rounded-lg p-8 "
    >
      {/* Row 1 */}
      <div className="flex flex-col md:grid grid-cols-2 gap-8 mb-8 ">
        {/* First name */}
        <div className="flex flex-col gap-2 ">
          <label className="text-base md:text-lg">ชื่อจริง</label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className=" h-12 md:w-full  rounded-xl border border-black px-4 outline-none bg-white focus:shadow-lg"
          />
        </div>

        {/* Last name */}
        <div className="flex flex-col gap-2">
          <label className="text-base md:text-lg">นามสกุล</label>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className=" h-12 md:w-full   rounded-xl border border-black px-4 outline-none bg-white focus:shadow-lg"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-8 mb-12">
        {/* Gender */}
        <div className="flex flex-col gap-2 ">
          <label className="text-base md:text-lg">เพศ</label>
          <select
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className=" h-12 md:w-full   rounded-xl border border-black px-4 outline-none bg-white focus:shadow-lg"
          >
            <option value="" disabled >
              เลือกเพศ
            </option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
          </select>
        </div>

        {/* Date of birth */}
        <div className="flex flex-col gap-2 relative bg-white">
          <label className="text-base md:text-lg">วัน/เดือน/ปีเกิด</label>
          <input
            type="date"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className=" h-12 w-full rounded-xl border border-black px-4 outline-none focus:shadow-lg"
          />


        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="Buttoncustom"
        >
          ยืนยัน
        </button>
      </div>
    </form>
  )
}

export default ProfileFillForm
