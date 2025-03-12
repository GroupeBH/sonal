import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Footer from './components/Footer';
import { Home } from './pages/Home';
import { SportsBetting } from './pages/SportsBetting';
import { HorseRacing } from './pages/HorseRacing';
import { Lottery } from './pages/Lottery';
import { VirtualGames } from './pages/VirtualGames';
import { BetSlip } from './components/BetSlip';
import { ScratchGames } from './pages/ScratchGames';
import { About } from './pages/About';
import { ContactPage } from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sports" element={<SportsBetting />} />
            <Route path="/horse-racing" element={<HorseRacing />} />
            <Route path="/lottery" element={<Lottery />} />
            <Route path="/virtual" element={<VirtualGames />} />
            <Route path="/scratch" element={<ScratchGames />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <BetSlip />
        <Footer />
      </div>
    </Router>
  );
}

export default App;