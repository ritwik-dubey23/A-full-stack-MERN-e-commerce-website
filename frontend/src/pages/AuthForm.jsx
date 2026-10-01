import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export default function AuthForm({ mode }) {
  const isRegister = mode === 'register';
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (isRegister && !form.name.trim()) e.name = 'Enter your name';
    if (!EMAIL_RE.test(form.email)) e.email = 'Enter a valid email address';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await (isRegister ? register(form) : login(form));
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-art" aria-hidden="true"><div className="phone" /><div className="trolley" /></div>
      <form className="auth-form" onSubmit={submit} noValidate>
        <h1>{isRegister ? 'Create an account' : 'Log in to Exclusive'}</h1>
        <p>Enter your details below</p>
        {isRegister && (
          <label>
            <input placeholder="Name" value={form.name} onChange={set('name')} autoComplete="name" />
            {errors.name && <small className="err">{errors.name}</small>}
          </label>
        )}
        <label>
          <input placeholder="Email" type="email" value={form.email} onChange={set('email')} autoComplete="email" />
          {errors.email && <small className="err">{errors.email}</small>}
        </label>
        <label>
          <input placeholder="Password" type="password" value={form.password} onChange={set('password')} autoComplete={isRegister ? 'new-password' : 'current-password'} />
          {errors.password && <small className="err">{errors.password}</small>}
        </label>
        {apiError && <p className="err api-err" role="alert">{apiError}</p>}
        {isRegister ? (
          <>
            <button className="btn btn-red block" disabled={loading}>{loading ? 'Creating account…' : 'Create Account'}</button>
            <p className="switch">Already have account? <Link to="/login">Log in</Link></p>
          </>
        ) : (
          <div className="login-row">
            <button className="btn btn-red" disabled={loading}>{loading ? 'Logging in…' : 'Log In'}</button>
            <Link to="/register" className="switch-link">New here? Create account</Link>
          </div>
        )}
      </form>
    </div>
  );
}
