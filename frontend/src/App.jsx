import { Routes, Route } from 'react-router-dom';
import CustomerRegister from './pages/CustomerRegister';
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <Routes>
      <Route path="/register/customer" element={<CustomerRegister />} />
      <Route path="/register/admin" element={<AdminRegister />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/verify/:token" element={<VerifyEmail />} />
    </Routes>
  );
}

export default App;
