export { default as Home } from "./Home"
export { default as Login } from "./Login"
export { default as Register } from "./Register"
export { default as Settings } from "./Settings"
export { default as History } from "./History"
export { default as ResultPage } from "./ResultPage"
export { default as Inspect } from "./Inspect"
export { default as SetupProfile } from "./SetupProfile"
export { default as Admin} from "./Admin"
export { default as GetselfHistory} from"./GetselfHistory"
export { default as HistoryAdmin} from"./HistoryAdmin"

export const Pagepath = {
  home: "/",
  login: "/login",
  register: "/register",
  settings: "/settings",
  history: "/history",
  GetselfHistory:"/get_history",
  resultpage: "/resultpage",
  inspect: "/inspect",
  setupprofile: "/setup-profile",
  admin: "/admin",
  HistoryAdmin:"/admin/history"
} as const