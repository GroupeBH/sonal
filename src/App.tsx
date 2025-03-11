import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Games from './pages/Games';
import Results from './pages/Results';
import ResponsibleGaming from './pages/ResponsibleGaming';
import News from './pages/News';
import Contact from './pages/Contact';
import TicketVerification from './pages/TicketVerification';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Legal from './pages/Legal';
import ProtectedRoute from './components/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/reducers/user';

function App() {
  const dispatch = useDispatch()
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  React.useEffect(()=>{
    if(currentUser) {
      dispatch(setCurrentUser(currentUser))
    }
  }, [currentUser])
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/products" 
            element={
              <ProtectedRoute>
                <Games />
              </ProtectedRoute>
            } 
          />
          <Route path="/results" element={<Results />} />
          <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify-ticket" element={<TicketVerification />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;