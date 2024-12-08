import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/SignIn';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
