import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function login() {
  const [email, setEmail] = useState('vaeid@gmail.com');
  const [password, setPassword] = useState('password');
  const { user, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className='loginContainer'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div className='formControl'>
          <label htmlFor='email'>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' name='email' id='email' />
        </div>
        <div className='formControl'>
          <label htmlFor='password'>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            name='password'
            id='password'
          />
        </div>
        <div className='buttons'>
          <button className='btn btn--primary'>Login</button>
        </div>
      </form>
    </div>
  );
}
