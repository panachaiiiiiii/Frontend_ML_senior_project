import { Pagepath } from "../../Page";
import { PagepathAPI } from "../../Router/Path";

interface LoginBtnProps {
  label: string;
  href?: string;
  imgSrc?: string;
}

const GuestBtn = (props: LoginBtnProps) => {
      const GuestLogin =  async () => {
        try {
          const response = await fetch(PagepathAPI.Guset, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const data = await response.json();
          if (data.status === 200 ) {
            sessionStorage.setItem("Token", data.token)
            sessionStorage.setItem("Guest","true")
            window.location.href = Pagepath.home;
          } 
        } catch (error) {
          console.error("Send token error:", error);
        }
      };
 return (
    <button
      onClick={() => GuestLogin()}
      className="bg-white hover:shadow-lg  w-[241px] h-16 rounded-full border-[2px] border-green-500 flex items-center justify-center gap-3 hover:bg-green-200 focus:bg-green-400 cursor-pointer "
    >
      {props.imgSrc && <img src={props.imgSrc} className="w-5" />}
      {props.label}
    </button>
  );
}

export default GuestBtn
