import { useState } from 'react';
import { useStore } from '../../context/store';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Mail, MapPin, Calendar, Award, Edit2, Lock, Download, MessageSquare, Users, BookOpen, TrendingUp, Target, Zap, Clock, CheckCircle2, AlertCircle, Star, Briefcase, BarChart3, Settings, LogOut } from 'lucide-react';

export const CoachProfile = () => {
  const { currentUser, coaches, players, sessionHistory, getCoachplayersessions } = useStore();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const coach = coaches.find((c) => c.coachId === currentUser.id);
  const myplayers = players.filter((p) => p.primaryCoach === currentUser.id);
  const mySessions = getCoachplayersessions ? getCoachplayersessions(currentUser.id) : sessionHistory.filter(s => s.coachId === currentUser.id);
  const submittedSessions = mySessions.filter(s => s.status === 'submitted').length;
  const completedSessions = mySessions.filter(s => s.status === 'completed').length;
  const avgRating = (mySessions.reduce((sum, s) => sum + (s.rating || 0), 0) / mySessions.length || 0).toFixed(1);
  const totalStudentPoints = myplayers.reduce((sum, s) => sum + (s.totalPoints || 0), 0);

  if (!coach) {
    return (
      <Layout>
        <div style={{ padding: '32px' }}>
          <div style={{
            background: '#FEF2F2',
            border: '2px solid #FEE2E2',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            color: '#991B1B'
          }}>
            <AlertCircle size={48} style={{ margin: '0 auto 16px' }} />
            <p style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Coach profile not found.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: '32px', background: '#F8FAFC', minHeight: '100vh' }}>
        {/* Hero Section with Profile Card */}
        <div style={{
          background: 'linear-gradient(135deg, #252c35, #526681)',
          borderRadius: '16px',
          padding: '40px 32px',
          marginBottom: '32px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(37, 44, 53, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
            {/* Avatar & Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1 }}>
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '56px',
                fontWeight: 'bold',
                border: '4px solid rgba(255, 255, 255, 0.5)',
                flexShrink: 0,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
              }}>
                {coach.name.charAt(0)}
              </div>

              <div>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, marginBottom: '8px' }}>
                  {coach.name}
                </h1>
                <p style={{ fontSize: '16px', opacity: 0.95, margin: 0, marginBottom: '16px' }}>
                  {coach.specialization}
                </p>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    padding: '6px 14px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    Primary Coach
                  </span>
                  <span style={{
                    padding: '6px 14px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    {myplayers.length} players
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setEditMode(!editMode)}
                style={{
                  padding: '12px 20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '10px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }}
              >
                <Edit2 size={18} />
                {editMode ? 'Done' : 'Edit'}
              </button>
              <button
                style={{
                  padding: '12px 20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '10px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }}
              >
                <Download size={18} />
                Reports
              </button>
            </div>
          </div>
        </div>

        {/* Key Statistics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {/* Total players */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '20px',
            border: '2px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(82, 102, 129, 0.1)';
            e.currentTarget.style.borderColor = '#526681';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.borderColor = '#E2E8F0';
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: '#E8F2F8',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}>
              <Users size={24} color="#526681" />
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0, marginBottom: '6px' }}>Total players</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#252c35', margin: 0 }}>{myplayers.length}</p>
          </div>

          {/* Sessions Conducted */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '20px',
            border: '2px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.1)';
            e.currentTarget.style.borderColor = '#10B981';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.borderColor = '#E2E8F0';
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: '#F0FDF4',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}>
              <CheckCircle2 size={24} color="#10B981" />
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0, marginBottom: '6px' }}>Sessions Completed</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#252c35', margin: 0 }}>{completedSessions}</p>
          </div>

          {/* Total Student Points */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '20px',
            border: '2px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(246, 201, 14, 0.1)';
            e.currentTarget.style.borderColor = '#526681';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.borderColor = '#E2E8F0';
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: '#FFFBEB',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}>
              <Zap size={24} color="#526681" />
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0, marginBottom: '6px' }}>Total Student Points</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#252c35', margin: 0 }}>{totalStudentPoints}</p>
          </div>

          {/* Rating */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '20px',
            border: '2px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.borderColor = '#EF4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.borderColor = '#E2E8F0';
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: '#FEF2F2',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}>
              <Star size={24} color="#EF4444" fill="#EF4444" />
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0, marginBottom: '6px' }}>Average Rating</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#252c35', margin: 0 }}>{avgRating} <span style={{ fontSize: '14px' }}>⭐</span></p>
          </div>
        </div>

        {/* Contact Information & Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Contact Info Card */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '14px',
            border: '1.5px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              padding: '24px',
              borderBottom: '1.5px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                background: '#E8F2F8',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Briefcase size={24} color="#526681" />
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                margin: 0
              }}>
                Contact Information
              </h3>
            </div>
            <div style={{ padding: '20px' }}>
              {[
                { icon: Mail, label: 'Email', value: coach.email },
                { icon: Calendar, label: 'Joined Date', value: coach.joinDate },
                { icon: Award, label: 'Specialization', value: coach.specialization },
                { icon: TrendingUp, label: 'Experience', value: `${new Date().getFullYear() - new Date(coach.joinDate).getFullYear()} years` }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      paddingBottom: idx < 3 ? '16px' : 0,
                      marginBottom: idx < 3 ? '16px' : 0,
                      borderBottom: idx < 3 ? '1px solid #F3F4F6' : 'none'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: '#F8FAFC',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={20} color="#526681" />
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', color: '#64748B', margin: 0, marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: '14px', color: '#111827', margin: 0, fontWeight: '600' }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '14px',
            border: '1.5px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              padding: '24px',
              borderBottom: '1.5px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                background: '#E8F2F8',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Target size={24} color="#526681" />
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                margin: 0
              }}>
                Quick Actions
              </h3>
            </div>
            <div style={{ padding: '16px' }}>
              {[
                { icon: Edit2, label: 'Edit Profile', color: '#526681' },
                { icon: Lock, label: 'Change Password', color: '#526681' },
                { icon: Settings, label: 'Preferences', color: '#10B981' },
                { icon: BarChart3, label: 'View Analytics', color: '#252c35' }
              ].map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      marginBottom: idx < 3 ? '10px' : 0,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      color: '#111827',
                      fontWeight: '600',
                      fontSize: '13px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = action.color;
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = action.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#F8FAFC';
                      e.currentTarget.style.color = '#111827';
                      e.currentTarget.style.borderColor = '#E2E8F0';
                    }}
                  >
                    <Icon size={18} />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* My players Section */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '14px',
          border: '1.5px solid #E2E8F0',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            padding: '24px',
            borderBottom: '1.5px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                background: '#E8F2F8',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={24} color="#526681" />
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                margin: 0
              }}>
                My players
              </h3>
            </div>
            <span style={{
              padding: '6px 12px',
              background: '#E8F2F8',
              color: '#252c35',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700'
            }}>
              {myplayers.length}
            </span>
          </div>

          <div style={{ padding: '20px' }}>
            {myplayers.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px'
              }}>
                {myplayers.map((student) => (
                  <a
                    key={student.playerId}
                    href={`/coach/student/${student.playerId}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '16px',
                      background: '#F8FAFC',
                      border: '2px solid #E2E8F0',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#526681';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(82, 102, 129, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #526681, #252c35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '18px'
                      }}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: 0 }}>{student.name}</h4>
                        <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0 0' }}>
                          Level {student.level} • Stage {student.stage}
                        </p>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                      fontSize: '12px'
                    }}>
                      <span style={{ color: '#64748B' }}>Progress</span>
                      <span style={{ fontWeight: '700', color: '#252c35' }}>{student.progress}%</span>
                    </div>

                    <div style={{
                      height: '6px',
                      background: '#E2E8F0',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #526681, #252c35)',
                        width: `${student.progress}%`,
                        transition: 'width 0.3s'
                      }} />
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      color: '#64748B'
                    }}>
                      <span style={{ fontWeight: '600', color: '#526681' }}>{student.totalPoints} pts</span>
                      <span style={{ fontWeight: '600' }}>View →</span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div style={{
                padding: '48px 32px',
                textAlign: 'center',
                color: '#64748B'
              }}>
                <Users size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p style={{ fontSize: '15px', margin: 0, marginBottom: '8px', fontWeight: '600' }}>No players assigned yet</p>
                <p style={{ fontSize: '13px', margin: 0, opacity: 0.7 }}>players assigned to you will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};


