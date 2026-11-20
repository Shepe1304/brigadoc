import { Link, Route, Routes } from 'react-router'
import Homepage from './components/Homepage'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  )
}