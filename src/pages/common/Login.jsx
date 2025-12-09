import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/store';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { LogIn, Lock, Mail, AlertCircle, ChevronRight, BarChart3, Target, Trophy, ArrowLeft } from 'lucide-react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      const role = result.user.role;
      navigate(`/${role}`);
    } else {
      setError(result.error);
    }
  };

  const handleDemo = (role) => {
    const demoUsers = {
      admin: { username: 'admin', password: 'admin' },
      coach: { username: 'coach', password: 'coach' }
    };
    const user = demoUsers[role];
    const result = login(user.username, user.password);
    if (result.success) {
      navigate(`/${role}`);
    }
  };

  return (
    <div className="login-wrapper">
      <style>{`
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          background: #f8f9fa;
          position: relative;
        }

        .back-to-home-btn {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          color: #0F4C81;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 100;
        }

        .back-to-home-btn:hover {
          background: #0F4C81;
          color: white;
          box-shadow: 0 2px 8px rgba(15, 76, 129, 0.2);
        }

        .login-left {
          flex: 1;
          background: linear-gradient(135deg, #0F4C81 0%, #1E88E5 100%);
          color: white;
          padding: 60px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-left-content {
          max-width: 450px;
        }

        .login-logo-large {
          font-size: 48px;
          margin-bottom: 20px;
          opacity: 0.95;
        }

        .login-left-title {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .login-left-text {
          font-size: 14px;
          opacity: 0.9;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .login-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .login-feature-item {
          display: flex;
          gap: 12px;
        }

        .login-feature-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .login-feature-item h4 {
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 4px 0;
        }

        .login-feature-item p {
          font-size: 12px;
          opacity: 0.85;
          margin: 0;
        }

        .login-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .login-form-container {
          width: 100%;
          max-width: 400px;
          background: white;
          padding: 32px;
          border-radius: 8px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
        }

        .login-form-header h2 {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 6px;
          color: #1f2937;
        }

        .login-form-header p {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 24px 0;
        }

        .login-error-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #991b1b;
          padding: 12px 14px;
          border-radius: 6px;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .login-form-main {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }

        .login-submit-btn {
          background: linear-gradient(135deg, #0F4C81, #1E88E5) !important;
          color: white !important;
          border: none !important;
          padding: 12px !important;
          font-weight: 700 !important;
          border-radius: 6px !important;
          font-size: 14px !important;
        }

        .login-submit-btn:hover {
          box-shadow: 0 4px 12px rgba(15, 76, 129, 0.3);
        }

        .login-divider-new {
          text-align: center;
          margin-bottom: 20px;
          font-size: 13px;
          color: #6b7280;
          font-weight: 600;
        }

        .demo-logins {
          padding-top: 16px;
        }

        .demo-title {
          font-size: 12px;
          color: #6b7280;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .demo-buttons-new {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .demo-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px;
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .demo-btn:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          border-color: #0F4C81;
        }

        .demo-btn-admin:hover {
          background: #0F4C81;
          color: white;
          border-color: #0F4C81;
        }

        .demo-btn-coach:hover {
          background: #1E88E5;
          color: white;
          border-color: #1E88E5;
        }

        @media (max-width: 1024px) {
          .login-wrapper {
            flex-direction: column;
          }

          .login-left {
            padding: 40px 20px;
            min-height: 300px;
          }

          .login-right {
            padding: 40px 20px;
          }

          .login-form-container {
            max-width: 100%;
          }
        }

        @media (max-width: 640px) {
          .login-left {
            padding: 30px 20px;
          }

          .login-form-container {
            padding: 24px;
          }

          .login-left-title {
            font-size: 24px;
          }

          .login-left-text {
            font-size: 13px;
            margin-bottom: 24px;
          }
        }
      `}</style>

      <button 
        className="back-to-home-btn"
        onClick={() => navigate('/')}
        title="Go back to home page"
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div className="login-left">
        <div className="login-left-content">
          <div className="login-logo-large">
            <LogIn size={48} />
          </div>
          <h1 className="login-left-title">Welcome Back</h1>
          <p className="login-left-text">Sign in to your CoachLife account to continue your journey in player development</p>
          
          <div className="login-features">
            <div className="login-feature-item">
              <div className="login-feature-icon">
                <Mail size={24} />
              </div>
              <div>
                <h4>Real-time Analytics</h4>
                <p>Track player progress instantly</p>
              </div>
            </div>
            <div className="login-feature-item">
              <div className="login-feature-icon">
                <LogIn size={24} />
              </div>
              <div>
                <h4>Secure Access</h4>
                <p>Your data is always protected</p>
              </div>
            </div>
            <div className="login-feature-item">
              <div className="login-feature-icon">
                <Lock size={24} />
              </div>
              <div>
                <h4>Role-Based Control</h4>
                <p>Tailored experience for each role</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="login-form-header">
            <h2>Sign In</h2>
            <p>Enter your credentials to access your dashboard</p>
          </div>

          {error && (
            <div className="login-error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form-main">
            <Input
              label="Username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={<Mail size={18} />}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
            />
            <Button type="submit" className="login-submit-btn" size="md">
              <LogIn size={18} /> Sign In
            </Button>
          </form>

          <div className="login-divider-new">
            <span>Quick Access</span>
          </div>

          <div className="demo-logins">
            <p className="demo-title">Try a demo account:</p>
            <div className="demo-buttons-new">
              <button 
                type="button"
                onClick={() => handleDemo('admin')}
                className="demo-btn demo-btn-admin"
              >
                <BarChart3 size={16} />
                <span>Admin</span>
              </button>
              <button 
                type="button"
                onClick={() => handleDemo('coach')}
                className="demo-btn demo-btn-coach"
              >
                <Target size={16} />
                <span>Coach</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
