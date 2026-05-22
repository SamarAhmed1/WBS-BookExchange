/**
 * Main App Component
 * Handles routing and layout
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { ListPage } from './pages/ListPage';
import { CartPage } from './pages/CartPage';
import { TestPage } from './pages/TestPage';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useAppEffects } from './utils/hooks';
import './styles/main.css';

function AppContent() {
  useAppEffects();

  return (
    <>
      <div id="cursor"></div>
      <div id="cursor-ring"></div>
      <canvas id="bg-canvas"></canvas>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/tests" element={<TestPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
