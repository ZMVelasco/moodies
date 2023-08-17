import { Route, Routes } from 'react-router-dom'
// import { supabase } from './supabase/supabaseClient.js'
import Home from './routes/Home.jsx'
import Signup from './routes/Signup.jsx'

function App () {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
