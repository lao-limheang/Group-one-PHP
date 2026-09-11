import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Logout({ setUser }) {
  const navigate = useNavigate();
  const hasPrompted = useRef(false); // Flag to track if alert was shown

  useEffect(() => {
    // Prevent double execution in React Strict Mode
    if (hasPrompted.current) return;
    hasPrompted.current = true;

    const confirmLogout = window.confirm(
      'Are you sure you want to log out?'
    );

    if (confirmLogout) {
      if (setUser) setUser(null);
      toast.success('Logged out successfully');
      navigate('/login', { replace: true });
    } else {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, setUser]);

  return null;
}