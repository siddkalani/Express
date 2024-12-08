import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/SignIn';
import OTPVerification from './components/Otp-verification';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
