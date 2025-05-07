import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';

export default function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState('Verifying...');

  useEffect(() => {
    api.get(`/auth/verify/${token}`)
      .then(() => setMessage('Email verified successfully!'))
      .catch(() => setMessage('Invalid or expired verification link.'));
  }, [token]);

  return <div className="text-center mt-10 text-lg">{message}</div>;
}
