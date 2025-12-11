import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../context/store';
import { Button } from './Button';
import logo from '../assets/favicon.png'; // If you need to use the image, use this syntax
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Target, 
  Gift, 
  BarChart3, 
  BookOpen,
  UserCheck,
  Zap,
  LogOut,
  Home,
  ChevronRight,
  Menu,
  Trophy,
  X
} from 'lucide-react';

export const Sidebar = ({ onClose }) => {
  const { currentUser, logout } = useStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleNavigation = () => {
    if (onClose) {
      onClose();
    }
  };

  const menuItems = {
    admin: [
      { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
      { label: 'Players', path: '/admin/players', icon: Users },
      { label: 'Coaches', path: '/admin/coaches', icon: UserCheck },
      { label: 'Assign Players', path: '/admin/assign-players', icon: UserCheck },
      { label: 'Learning Pathway', path: '/admin/learning-pathway', icon: BookOpen },
      { label: "Leader Board", path: '/leaderboard', icon: Trophy },
      { label: 'Rewards', path: '/admin/rewards', icon: Gift },
      { label: 'Redeem History', path: '/admin/redeem-history', icon: BarChart3 },
      { label: 'Analytics', path: '/admin/analytics', icon: TrendingUp },
    ],
    coach: [
      { label: 'Dashboard', path: '/coach', icon: LayoutDashboard },
      { label: 'My Players', path: '/coach/players', icon: Users },
      { label: 'Leader Board', path: '/leaderboard', icon: Trophy },
      { label: 'Start Session', path: '/coach/start-session', icon: BookOpen },
      { label: 'Profile', path: '/coach/profile', icon: UserCheck },
    ],
  };

  const items = menuItems[currentUser?.role] || [];

  return (
    <div style={{
      width: '280px',
      height: '100vh',
      background: 'linear-gradient(135deg, #252c35 0%, #526681 100%)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100,
      color: 'white',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '18px',
        borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#dde3e8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(82, 102, 129, 0.4)',
            boxShadow: '0 4px 12px rgba(82, 102, 129, 0.1)'
          }}>
            <img src={logo} alt="CoachLife Logo" style={{ width: '26px', height: '26px' }} />
          </div>
          <div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              margin: 0,
              letterSpacing: '0.5px',
              color: '#ffffffff',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}>CoachLife</h1>
            <p style={{
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: '2px 0 0 0',
              fontWeight: '500'
            }}>Technology Garage</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px 8px',
        scrollBehavior: 'smooth'
      }}>
        

        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavigation}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                margin: '6px 0',
                borderRadius: '10px',
                textDecoration: 'none',
                color: isActive ? '#dde3e8' : 'rgba(255, 255, 255, 0.75)',
                background: isActive ? 'rgba(82, 102, 129, 0.15)' : 'transparent',
                border: isActive ? '1.5px solid #526681' : '1.5px solid transparent',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                fontSize: '14px',
                fontWeight: isActive ? '600' : '500',
                boxShadow: isActive ? '0 4px 12px rgba(82, 102, 129, 0.1)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateX(6px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.borderColor = 'transparent';
                }
              }}
              title={item.label}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px'
                }}>
                  <Icon size={20} />
                </div>
                <span style={{ letterSpacing: '0.3px' }}>{item.label}</span>
              </div>
              {isActive && (
                <ChevronRight 
                  size={18} 
                  style={{
                    transition: 'transform 0.3s ease',
                    transform: 'scaleX(1.2)'
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: 'rgba(255, 255, 255, 0.1)',
        margin: '8px 0'
      }} />

      {/* Footer */}
      <div style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        {/* User Card */}
        <div style={{
          padding: '14px 12px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        }}
        >
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #252c35, #526681)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#dde3e8',
            flexShrink: 0,
            boxShadow: '0 4px 12px #dde3e84d'
          }}>
            {currentUser?.username?.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              margin: 0,
              fontSize: '13px',
              fontWeight: '600',
              color: 'white',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              letterSpacing: '0.3px'
            }}>
              {currentUser?.username}
            </p>
            <p style={{
              margin: '3px 0 0 0',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.6)',
              textTransform: 'capitalize',
              fontWeight: '500'
            }}>
              {currentUser?.role === 'admin' ? 'Admin' : currentUser?.role === 'coach' ? 'Coach' : 'Player'}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '11px 14px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            borderRadius: '10px',
            color: '#ffffffff',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 0, 0, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
          }}
          title="Logout"
          aria-label="Logout"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};


