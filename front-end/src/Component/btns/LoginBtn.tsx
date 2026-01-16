

import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
interface LoginBtnProps {
  label: string;
  href?: string;
  imgSrc?: string;
}


const LoginBtn = (props: LoginBtnProps) => {
    const navigate = useNavigate();
    const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse.access_token);
    },
  });
  return (
    <button onClick={() => login()} className="hover:shadow-lg  w-[241px] h-16 rounded-full border-[2px] border-green-500 flex items-center justify-center gap-3 hover:bg-green-200 focus:bg-green-400 cursor-pointer ">

        {props.imgSrc && <img src={props.imgSrc} className="w-5" />}
        {props.label}

    </button>
  );
};

export default LoginBtn;
