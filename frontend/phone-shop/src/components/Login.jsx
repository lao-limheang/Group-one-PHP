import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (username === 'admin' && password === '123'){
      setUser({ full_name: 'Chork Chansovanpanha', role: 'Admin' });
      navigate('/dashboard');
    } else if (username === 'cashier' && password === '123') {
      setUser({ full_name: 'Som Sreyvith', role: 'Cashier' });
      navigate('/dashboard');
    } else {
      setError('Username or Password is Incorrect!');
    }
    setLoading(false);
    
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f5f7fb' }}>
      <form onSubmit={handleLogin} className="card p-4 shadow-sm" style={{ width: '350px' }}>
        <h3 className="text-center mb-4 text-primary"><i className="bi bi-phone"></i> Phone Shop</h3>
        {error && <div className="alert alert-danger py-2 text-center small">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary w-100">
          {loading ? 'កំពុងផ្ទៀងផ្ទាត់...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;