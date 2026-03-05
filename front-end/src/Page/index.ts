export { default as Home } from "./Home"
export { default as Login } from "./Login"
export { default as Register } from "./Register"
export { default as Settings } from "./Settings"
export { default as History } from "./History"
export { default as ResultPage } from "./ResultPage"
export { default as Inspect } from "./Inspect"
export { default as SetupProfile } from "./SetupProfile"
export { default as Admin} from "./Admin"
export const Pagepath = {
  home: "/",
  login: "/login",
  register: "/register",
  settings: "/settings",
  history: "/history",
  resultpage: "/resultpage",
  inspect: "/inspect",
  setupprofile: "/setup-profile",
  admin: "/admin"
} as const