import { useNavigate } from 'react-router-dom';
import { LogIn, Users, BarChart3, Target, Trophy, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../../components/Button';

export function Home() {
  const navigate = useNavigate();

  const loginCredentials = [
    {
      role: 'Admin',
      username: 'admin',
      password: 'admin',
      description: 'Full system control and analytics',
      icon: BarChart3,
      color: '#252c35'
    },
    {
      role: 'Coach',
      username: 'coach',
      password: 'coach',
      description: 'Manage players and sessions',
      icon: Target,
      color: '#526681'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Player Management',
      description: 'Comprehensive player tracking and development'
    },
    {
      icon: Target,
      title: 'Learning Pathways',
      description: 'Structured training programs by skill level'
    },
    {
      icon: Trophy,
      title: 'Reward System',
      description: 'Gamified achievements and point tracking'
    },
    {
      icon: Zap,
      title: 'Session Management',
      description: 'Create, track, and analyze training sessions'
    }
  ];

  const benefits = [
    'Real-time progress tracking',
    'Interactive learning modules',
    'Performance analytics',
    'Gamified rewards system'
  ];

  return (
    <div className="home-container">
      <style>{`
        .home-container {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .home-header {
          background: linear-gradient(135deg, #252c35 0%, #526681 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
        }

        .home-header-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .home-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .home-logo h1 {
          font-size: 40px;
          font-weight: 800;
          colot: ddee3e8;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .logo-icon {
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
        }

        .home-tagline {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 24px;
          opacity: 0.95;
        }

        .home-cta-button {
          padding: 12px 28px !important;
          font-size: 14px !important;
          border-radius: 6px !important;
          background: white !important;
          color: #252c35 !important;
          font-weight: 700 !important;
          border: none !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .home-cta-button:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .home-features {
          padding: 60px 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .home-features h2 {
          font-size: 32px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 40px;
          color: #1f2937;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .feature-card {
          background: white;
          padding: 24px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }

        .feature-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .feature-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #252c35, #526681);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 12px;
        }

        .feature-card h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #1f2937;
        }

        .feature-card p {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .home-credentials {
          padding: 60px 20px;
          background: white;
        }

        .home-credentials h2 {
          font-size: 32px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 8px;
          color: #1f2937;
        }

        .credentials-subtitle {
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 40px;
        }

        .credentials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }

        .credential-card {
          background: white;
          padding: 24px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          text-align: center;
        }

        .credential-card:hover {
          border-color: #252c35;
          box-shadow: 0 4px 12px rgba(37, 44, 53, 0.1);
        }

        .credential-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #252c35, #526681);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 16px;
        }

        .credential-card h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #1f2937;
        }

        .credential-info {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 12px;
          border: 1px solid #e5e7eb;
        }

        .credential-info p {
          font-size: 12px;
          margin: 6px 0;
          color: #374151;
          font-family: monospace;
        }

        .credential-info strong {
          color: #252c35;
          font-weight: 700;
        }

        .credential-description {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .credential-button {
          width: 100%;
          padding: 10px 16px !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          border-radius: 6px !important;
          background: linear-gradient(135deg, #252c35, #526681) !important;
          color: white !important;
          border: none !important;
        }

        .credential-button:hover {
          box-shadow: 0 4px 12px rgba(37, 44, 53, 0.2);
        }

        .home-footer {
          background: #1f2937;
          color: white;
          text-align: center;
          padding: 20px;
          font-size: 13px;
        }

        @media (max-width: 768px) {
          .home-logo h1 {
            font-size: 32px;
          }

          .home-features h2,
          .home-credentials h2 {
            font-size: 24px;
          }

          .features-grid,
          .credentials-grid {
            gap: 16px;
          }

          .credential-card {
            padding: 20px;
          }
        }
      `}</style>

      {/* Header */}
      <header className="home-header" data-aos="fade-up" data-aos-duration="800">
        <div className="home-header-content">
          <div className="home-logo">
            <Zap size={40} className="logo-icon" />
            <h1>CoachLife</h1>
          </div>
          <p className="home-tagline">Gamified Learning Platform for Coaches & Players</p>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/login')}
            className="home-cta-button"
          >
            <LogIn size={18} /> Get Started
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="home-features" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
        <h2>Platform Features</h2>
        <div className="features-grid">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="feature-card" data-aos="zoom-in" data-aos-duration="800">
                <div className="feature-icon">
                  <Icon size={32} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Login Credentials Section */}
      <section className="home-credentials">
        <h2>Demo Credentials</h2>
        <p className="credentials-subtitle">Choose a role to explore the platform</p>
        <div className="credentials-grid">
          {loginCredentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div key={idx} className="credential-card">
                <div className="credential-icon">
                  <Icon size={48} />
                </div>
                <h3>{cred.role}</h3>
                <div className="credential-info">
                  <p><strong>Username:</strong> {cred.username}</p>
                  <p><strong>Password:</strong> {cred.password}</p>
                </div>
                <p className="credential-description">{cred.description}</p>
                <Button 
                  onClick={() => navigate('/login')}
                  className="credential-button"
                >
                  <ArrowRight size={16} /> Login as {cred.role}
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2025 CoachLife. All rights reserved. | Empowering Coaches & Players</p>
      </footer>
    </div>
  );
}
