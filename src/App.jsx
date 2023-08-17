import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { supabase } from './supabase/supabaseClient.js'
import Home from './routes/Home.jsx'
import Signup from './routes/Signup.jsx'
import Dashboard from './routes/Dashboard.jsx'
import LinkConfirmationPage from './routes/LinkConfirmation.jsx'
import NotFound from './routes/NotFound.jsx'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        console.log('No session, redirecting to /');
        navigate('/');
      } else {
        console.log('Session found, redirecting to /dashboard');
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/await-confirmation' element={<LinkConfirmationPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;