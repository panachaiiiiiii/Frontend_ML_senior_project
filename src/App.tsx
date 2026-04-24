import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import * as Page from "./Page";
import "./App.css";
import "antd/dist/reset.css";
import ProtectedRoute from "./Component/ProtectedRoute";
import ProtectedRouteLogin from "./Component/ProtectedRouteLogin";
import ProtectedRouteAdmin from "./Component/ProtectedRouteAdmin";

const App = () => {
  return (
    //login
    <Routes>
      <Route
        path={Page.Pagepath.admin}
        element={
          <ProtectedRouteAdmin>
            <Layout />
          </ProtectedRouteAdmin>
        }
      >
        <Route index element={<Page.Admin/>} />
        <Route path="history" element={<Page.HistoryAdmin />} />
        <Route path="user" element={<Page.Adminuser />} />
        <Route path="ModelSetting" element={<Page.Models />} />

      </Route>

      <Route
        element={
          <ProtectedRouteLogin>
            <Layout />
          </ProtectedRouteLogin>
        }
      >
        <Route path={Page.Pagepath.login} element={<Page.Login />} />
        <Route path={Page.Pagepath.register} element={<Page.Register />} />
        <Route
          path={Page.Pagepath.setupprofile}
          element={<Page.SetupProfile />}
        />
      </Route>

      {/* logined  */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path={Page.Pagepath.home} element={<Page.Home />} />
        <Route path={Page.Pagepath.settings} element={<Page.Settings />} />
        <Route path={Page.Pagepath.history} element={<Page.History />} />
        <Route path={Page.Pagepath.resultpage} element={<Page.ResultPage />} />
        <Route path={Page.Pagepath.inspect} element={<Page.Inspect />} />
        <Route path={Page.Pagepath.CanncerNews} element={<Page.CanncerNews />} />
        <Route path={Page.Pagepath.Precancer} element={<Page.Precancer/>}/>
        
        <Route
          path={Page.Pagepath.GetselfHistory}
          element={<Page.GetselfHistory />}
        />
      </Route>
    </Routes>
  );
};

export default App;
