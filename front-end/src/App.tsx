import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import * as Page from './Page'
import './App.css';
import 'antd/dist/reset.css';

const App = () => {
  return (
    <Routes>
      <Route path={Page.Pagepath.home} element={<Layout />}>
        <Route index element={<Page.Home />} />
      </Route>
    <Route path={Page.Pagepath.login} element={<Layout />}>
        <Route index element={<Page.Login />} />
      </Route>
      <Route path={Page.Pagepath.register} element={<Layout />}>
        <Route index element={<Page.Register />} />
      </Route>
      <Route path={Page.Pagepath.settings} element={<Layout />}>
        <Route index element={<Page.Settings />} />
      </Route>
      <Route path={Page.Pagepath.history} element={<Layout />}>
        <Route index element={<Page.History />} />
      </Route>
      <Route path={Page.Pagepath.resultpage} element={<Layout />}>
        <Route index element={<Page.ResultPage />} />
      </Route>
      <Route path={Page.Pagepath.inspect} element={<Layout />}>
        <Route index element={<Page.Inspect />} />
      </Route>
      <Route path={Page.Pagepath.setupprofile} element={<Layout />}>
        <Route index element={<Page.SetupProfile />} />
      </Route>
    </Routes>
  )
}

export default App
