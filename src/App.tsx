import { Route, Routes } from 'react-router'
import Homepage from './components/Homepage'
import CreateProfile from './components/CreateProfile'
import { Toaster } from 'react-hot-toast'
import EditProfile from './components/EditProfile'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/new" element={<CreateProfile />} />
        <Route path="/:id/edit" element={<EditProfile />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  )
}