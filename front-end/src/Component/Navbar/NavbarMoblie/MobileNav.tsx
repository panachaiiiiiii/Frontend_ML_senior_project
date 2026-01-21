import {
  HomeOutlined,
  PictureOutlined,
  UserOutlined,
} from "@ant-design/icons";

const MobileNav = () => {
  return (
<div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Bottom Bar */}
      <div className="relative h-16 bg-emerald-500 flex items-center justify-between px-10">
        
        {/* Home */}
        <button className="text-white">
          <HomeOutlined className="text-[26px]" />
        </button>

        {/* Spacer */}
        <div className="w-12" />

        {/* Profile */}
        <button className="text-white">
          <UserOutlined className="text-[26px]" />
        </button>

        {/* Center Floating Button */}
        <button
          className="
            absolute left-1/2 -top-6 -translate-x-1/2
            w-16 h-16 rounded-full
            bg-emerald-100
            flex items-center justify-center
            shadow-lg
          "
        >
          <PictureOutlined className="text-emerald-600 text-[28px]" />
        </button>

      </div>
    </div>
  )
}

export default MobileNav
