import { useState } from 'react';
import api from '../../api/axiosInstance';

export default function AdminLoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/admin-login', form);
      setSuccess('Login successful');
      localStorage.setItem('admin_token', res.data.token); 
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      {['email', 'password'].map((field) => (
        <input
          key={field}
          type={field === 'password' ? 'password' : 'email'}
          name={field}
          placeholder={field}
          className="w-full p-2 mb-3 border rounded"
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Login
      </button>
      {success && <p className="mt-3 text-green-600">{success}</p>}
      {error && <p className="mt-3 text-red-600">{error}</p>}
    </form>
  );
}
