import { useState } from 'react';
import api from '../../api/axiosInstance';

export default function AdminRegisterForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { ...form, role: 'admin' });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Registration</h2>
      {['firstName', 'lastName', 'email', 'password'].map((field) => (
        <input
          key={field}
          type={field === 'password' ? 'password' : 'text'}
          name={field}
          placeholder={field}
          className="w-full p-2 mb-3 border rounded"
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Register
      </button>
      {message && <p className="mt-3 text-green-600">{message}</p>}
      {error && <p className="mt-3 text-red-600">{error}</p>}
    </form>
  );
}
