import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import * as Page from './Page'
import './App.css';
import { Home } from './Page';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Page.Home />} />
      </Route>
<Route path="/login" element={<Layout />}>
        <Route index element={<Page.Login />} />
      </Route>
    </Routes>
  )
}

export default App
