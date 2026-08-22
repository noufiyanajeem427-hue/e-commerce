import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingpage/Landingpage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    
    </Router>
  );
}

export default App;