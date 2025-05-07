import { useState } from 'react';
import api from '../../api/axiosInstance';

export default function CustomerRegisterForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { ...form, role: 'customer' });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Customer Registration</h2>
      {['firstName', 'lastName', 'email', 'password'].map((field) => (
        <input
          key={field}
          type={field === 'password' ? 'password' : 'text'}
          name={field}
          placeholder={field}
          className="w-full mb-2 p-2 border rounded"
          onChange={handleChange}
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      {message && <p className="mt-2 text-sm text-green-700">{message}</p>}
    </form>
  );
}
