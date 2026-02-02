import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import * as Page from "./Page";
import "./App.css";
import "antd/dist/reset.css";
import ProtectedRoute from "./Component/ProtectedRoute";
import ProtectedRouteLogin from "./Component/ProtectedRouteLogin";

const App = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRouteLogin>
            <Layout />
          </ProtectedRouteLogin>
        }
      >
        <Route path={Page.Pagepath.login} element={<Page.Login />} />
        <Route path={Page.Pagepath.register} element={<Page.Register />} />
        <Route path={Page.Pagepath.setupprofile} element={<Page.SetupProfile />}/>
      </Route>
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

      </Route>
    </Routes>
  );
};

export default App;
