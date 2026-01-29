import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BeneficiarioPage from './pages/BeneficiarioPage';
import RegistrarBeneficiarioPage from './pages/RegistrarBeneficiarioPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BeneficiarioPage />} />
        <Route path="/registrar" element={<RegistrarBeneficiarioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
