import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Page/Home'
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
