import { useStore } from '../context/store';
import { LogOut, Bell, Settings, Search, Menu, Clock, AlertCircle, CheckCircle2, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { currentUser, logout } = useStore();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'New session completed',
      message: 'Player completed Session #5',
      time: '2 hours ago',
      icon: CheckCircle2
    },
    {
      id: 2,
      type: 'warning',
      title: 'Pending assignments',
      message: '3 players waiting for assignment',
      time: '1 hour ago',
      icon: AlertCircle
    },
    {
      id: 3,
      type: 'info',
      title: 'System update',
      message: 'Analytics dashboard updated',
      time: '30 mins ago',
      icon: Clock
    },
    {
      id: 4,
      type: 'success',
      title: 'Rewards redeemed',
      message: '2 players claimed rewards',
      time: '15 mins ago',
      icon: CheckCircle2
    }
  ];

  return (
    <div style={{
      width: '100%',
      height: '90px',
      background: 'linear-gradient(90deg, #FFFFFF 0%, #F8FAFC 100%)',
      borderBottom: '2px solid #E2E8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Left Section - Title & Breadcrumb */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #000000ff, #060030ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            letterSpacing: '-0.5px'
          }}>
            CoachLife
          </h1>
          
        </div>

        {/* Status Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          backgroundColor: '#F0FDF4',
          color: '#15803d',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          border: '1px solid #DCFCE7'
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#15803d',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }} />
          Online
        </div>
      </div>

      {/* Right Section - Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        

        {/* Divider */}
        <div style={{
          width: '1px',
          height: '35px',
          background: 'linear-gradient(180deg, transparent, #060030ff, transparent)'
        }} />

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowSettings(false);
              setShowProfile(false);
            }}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              border: '1.5px solid #E5E7EB',
              background: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F3F4F6';
              e.currentTarget.style.borderColor = '#060030ff';
              e.currentTarget.style.color = '#060030ff';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(82, 102, 129, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.color = '#64748B';
              e.currentTarget.style.boxShadow = 'none';
            }}
            title="Notifications"
          >
            <Bell size={20} />
            <div style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #EF4444, #DC2626)',
              border: '2px solid #FFFFFF',
              boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
            }} />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '52px',
              right: 0,
              width: '380px',
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1.5px solid #E5E7EB',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
              zIndex: 1000,
              overflow: 'hidden',
              animation: 'slideDown 0.3s ease'
            }}>
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #E5E7EB',
                fontWeight: '700',
                fontSize: '14px',
                color: '#111827',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Notifications</span>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  backgroundColor: '#FEE2E2',
                  color: '#991B1B',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '700'
                }}>
                  {notifications.length}
                </span>
              </div>
              <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                {notifications.map((notif, idx) => {
                  const NotifIcon = notif.icon;
                  return (
                    <div
                      key={notif.id}
                      style={{
                        padding: '14px 16px',
                        borderBottom: idx < notifications.length - 1 ? '1px solid #F3F4F6' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        gap: '12px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        background: notif.type === 'success' ? '#F0FDF4' : notif.type === 'warning' ? '#FFFBEB' : '#EFF6FF',
                        color: notif.type === 'success' ? '#10B981' : notif.type === 'warning' ? '#060030ff' : '#060030ff'
                      }}>
                        <NotifIcon size={18} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          margin: 0,
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#111827'
                        }}>
                          {notif.title}
                        </p>
                        <p style={{
                          margin: '4px 0 0 0',
                          fontSize: '12px',
                          color: '#64748B'
                        }}>
                          {notif.message}
                        </p>
                        <p style={{
                          margin: '4px 0 0 0',
                          fontSize: '11px',
                          color: '#94A3B8'
                        }}>
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{
                padding: '12px 16px',
                borderTop: '1px solid #E5E7EB',
                textAlign: 'center'
              }}>
                <button style={{
                  padding: '8px 16px',
                  color: '#252c35',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E8F2F8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}>
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowSettings(!showSettings);
              setShowNotifications(false);
              setShowProfile(false);
            }}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              border: '1.5px solid #E5E7EB',
              background: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F3F4F6';
              e.currentTarget.style.borderColor = '#060030ff';
              e.currentTarget.style.color = '#060030ff';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(82, 102, 129, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.color = '#64748B';
              e.currentTarget.style.boxShadow = 'none';
            }}
            title="Settings"
          >
            <Settings size={20} />
          </button>

          {/* Settings Dropdown */}
          {showSettings && (
            <div style={{
              position: 'absolute',
              top: '52px',
              right: 0,
              width: '240px',
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1.5px solid #E5E7EB',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
              zIndex: 1000,
              overflow: 'hidden'
            }}>
              {[
                { label: 'Account Settings', icon: '⚙️' },
                { label: 'Privacy & Security', icon: '🔒' },
                { label: 'Theme Preferences', icon: '🎨' },
                { label: 'Help & Support', icon: '❓' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#111827',
                    borderBottom: idx < 3 ? '1px solid #F3F4F6' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                >
                  <span style={{ marginRight: '8px' }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
              setShowSettings(false);
            }}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              border: '1.5px solid #E5E7EB',
              background: 'linear-gradient(135deg, #000000ff, #060030ff)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 44, 53, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
            title="Profile"
          >
            {currentUser?.username?.charAt(0).toUpperCase()}
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div style={{
              position: 'absolute',
              top: '52px',
              right: 0,
              width: '260px',
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1.5px solid #E5E7EB',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
              zIndex: 1000,
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '16px',
                borderBottom: '1px solid #E5E7EB'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #060030ff 0%, #000000ff 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    {currentUser?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style={{
                      margin: 0,
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      {currentUser?.username}
                    </p>
                    <p style={{
                      margin: '4px 0 0 0',
                      fontSize: '11px',
                      color: '#64748B',
                      textTransform: 'capitalize'
                    }}>
                      {currentUser?.role}
                    </p>
                  </div>
                </div>
              </div>
              {[
                { label: 'View Profile', icon: '' },
                { label: 'My Account', icon: '' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#111827',
                    borderBottom: idx < 1 ? '1px solid #F3F4F6' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                >
                  <span style={{ marginRight: '8px' }}>
                    {typeof item.icon === 'string' ? item.icon : '📋'}
                  </span>
                  {item.label}
                </button>
              ))}
              <div style={{
                padding: '12px 16px',
                borderTop: '1px solid #E5E7EB'
              }}>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1.5px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    color: '#EF4444',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: isLoggingOut ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    opacity: isLoggingOut ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoggingOut) {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                      e.currentTarget.style.color = '#DC2626';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoggingOut) {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                      e.currentTarget.style.color = '#EF4444';
                    }
                  }}
                >
                  <LogOut size={16} />
                  <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};


