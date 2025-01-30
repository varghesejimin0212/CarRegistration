import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CarsList from './components/CarsList'
import RegistrationStatus from './components/RegistrationStatus'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Cars List</Link></li>
            <li><Link to="/registration">Registration Status</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<CarsList />} />
          <Route path="/registration" element={<RegistrationStatus />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App