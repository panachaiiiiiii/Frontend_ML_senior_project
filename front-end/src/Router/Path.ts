const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const PagepathAPI = {

    LoginWithGoogle: `${BACKEND_URL}/login/google`,
    Auth: `${BACKEND_URL}/userinfo`,
    Guset:`${BACKEND_URL}/guest`,
    Register : `${BACKEND_URL}/register`,
    SetupUser : `${BACKEND_URL}/setupprofile`,
    Profile :`${BACKEND_URL}/setting`,
    Login: `${BACKEND_URL}/login`,
    GetAllUser: `${BACKEND_URL}/user`,
    Predict:`${BACKEND_URL}/predict`,
    History:`${BACKEND_URL}/history`,
    
    
} as const