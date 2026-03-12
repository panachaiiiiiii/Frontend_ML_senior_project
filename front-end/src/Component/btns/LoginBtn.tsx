import { useGoogleLogin } from "@react-oauth/google";
import { PagepathAPI } from "../../Router/Path";
import { Pagepath } from "../../Page";
interface LoginBtnProps {
  label: string;
  href?: string;
  imgSrc?: string;
}

const LoginBtn = (props: LoginBtnProps) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleSuccess(tokenResponse.access_token);
    },
  });

  const handleSuccess = async (accessToken: string) => {
    try {
      const response = await fetch(PagepathAPI.LoginWithGoogle, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: accessToken,
        }),
      });

      const data = await response.json();
      if (data.status === 201) {
        sessionStorage.setItem("Token", data.token);
        window.location.href = Pagepath.setupprofile;
      }
      if (data.status === 200) {
        if (data.user.role === "admin") {
          sessionStorage.setItem("Token", data.token);
          window.location.href = Pagepath.admin;
        } else {
          sessionStorage.setItem("Token", data.token);
          window.location.href = Pagepath.home;
        }
      } else {
      }
    } catch (error) {
      console.error("Send token error:", error);
    }
  };

  return (
    <button
      onClick={() => login()}
      className="bg-white hover:shadow-lg  w-[241px] h-16 rounded-full border-[2px] border-green-500 flex items-center justify-center gap-3 hover:bg-green-200 focus:bg-green-400 cursor-pointer "
    >
      {props.imgSrc && <img src={props.imgSrc} className="w-5" />}
      {props.label}
    </button>
  );
};

export default LoginBtn;
