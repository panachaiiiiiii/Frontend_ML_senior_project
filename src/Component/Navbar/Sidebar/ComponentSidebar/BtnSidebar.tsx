import type { ReactNode } from 'react'; 
import { Link } from 'react-router-dom';


interface BtnSidebarProps {
  href: string;
  label: string;
  icon?: ReactNode; 
  active?: boolean; 
}

const BtnSidebar = ({ href, label, icon, active }: BtnSidebarProps) => {
  return (
    <Link
      to={href}
      className={`
        flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200
        ${active 
          ? "bg-white text-emerald-600 shadow-lg font-bold scale-105" 
          : "text-emerald-50 hover:bg-emerald-500/50 hover:pl-8"      
        }
      `}
    >
      {/* แสดง Icon ถ้ามีการส่งมา */}
      {icon && <span className="text-xl">{icon}</span>}
      
      <span className="tracking-wide">{label}</span>
    </Link>
  );
};

export default BtnSidebar;