const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const PagepathAPI = {

    LoginWithGoogle: `${BACKEND_URL}/login/google`,
} as const