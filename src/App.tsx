import { Routes, Route, HashRouter } from 'react-router-dom'

import Landing from './pages/Landing'

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
      </Routes>
    </HashRouter>
  )
}
