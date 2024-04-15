import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import ExplorePage from './Pages/ExplorePage'
import LikesPage from './Pages/LikesPage'
import SignUpPage from './Pages/SignUpPage'

import SideBar from './Components/SideBar'

function App() {
  return (
    <div className='flex'>
      <SideBar />
      <div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
        <Routes>
          <Route path='/' element={<HomePage /> }/>
          <Route path='/login' element={<LoginPage /> }/>
          <Route path='/signup' element={<SignUpPage /> }/>
          <Route path='/explore' element={<ExplorePage /> }/>
          <Route path='/likes' element={<LikesPage /> }/>
        </Routes>
        <Toaster />
      </div>
    </div>
  )
}

export default App
