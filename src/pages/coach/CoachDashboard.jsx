import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../../context/store';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Users, BookOpen, Target, TrendingUp, Plus, Star, Clock, Award, Search, Filter, ChevronRight, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

export const CoachDashboard = () => {
  const { currentUser, players, sessionHistory, sessionDrafts } = useStore();
  const [searchStudent, setSearchStudent] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  
  const myplayers = players.filter((p) => p.primaryCoach === currentUser.id);
  const mySessions = sessionHistory.filter((s) => s.coachId === currentUser.id);
  const myDrafts = sessionDrafts.filter((s) => s.coachId === currentUser.id);
  const completedSessions = mySessions.filter((s) => s.status === 'completed').length;
  const totalPoints = myplayers.reduce((sum, s) => sum + (s.totalPoints || 0), 0);
  const avgProgress = Math.round(myplayers.reduce((sum, s) => sum + (s.progress || 0), 0) / myplayers.length) || 0;
  
  const avgRating = (
    mySessions.reduce((sum, s) => sum + (s.rating || 0), 0) / mySessions.length || 0
  ).toFixed(1);

  // Filter and search players
  const filteredplayers = myplayers.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchStudent.toLowerCase());
    const matchesLevel = filterLevel === 'All' || student.level.toString() === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const levels = ['All', ...new Set(myplayers.map(s => s.level.toString()))];
  const topplayers = myplayers.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0)).slice(0, 3);

  return (
    <Layout>
      <div style={{ padding: '32px', background: '#F8FAFC', minHeight: '100vh' }}>
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #252c35, #526681)',
          borderRadius: '16px',
          padding: '32px',
          color: 'white',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(37, 44, 53, 0.2)'
        }}
        data-aos="fade-up"
        data-aos-duration="800">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                margin: 0,
                marginBottom: '8px'
              }}>
                Coach Dashboard
              </h1>
              <p style={{
                fontSize: '15px',
                opacity: 0.9,
                margin: 0
              }}>
                Welcome back, {currentUser.username}! Manage your players and coaching sessions
              </p>
            </div>
            <Link to="/coach/start-session" style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '10px',
              color: 'white',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              textDecoration: 'none',
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
            }}>
              <Plus size={18} />
              Start Session
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800">
          {/* My players */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease'
          }}
          data-aos="zoom-in"
          data-aos-delay="0"
          data-aos-duration="800"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(82, 102, 129, 0.1)';
            e.currentTarget.style.borderColor = '#526681';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.borderColor = '#E2E8F0';
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: '#E8F2F8',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Users size={28} color="#526681" />
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0, marginBottom: '8px' }}>My players</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#252c35', margin: 0 }}>{myplayers.length}</p>
            <p style={{ fontSize: '12px', color: '#10B981', margin: '12px 0 0 0' }}>Avg Progress: {avgProgress}%</p>
          </div>

          {/* Sessions Completed */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease'
          }}
          data-aos="zoom-in"
          data-aos-delay="100"
          data-aos-duration="800"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.1)';
            e.currentTarget.style.borderColor = '#10B981';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.borderColor = '#E2E8F0';
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: '#F0FDF4',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <CheckCircle2 size={28} color="#10B981" />
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0, marginBottom: '8px' }}>Sessions Completed</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#252c35', margin: 0 }}>{completedSessions}</p>
            <p style={{ fontSize: '12px', color: '#10B981', margin: '12px 0 0 0' }}>Total Sessions: {mySessions.length}</p>
          </div>

          {/* Draft Sessions */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease'
          }}
          data-aos="zoom-in"
          data-aos-delay="200"
          data-aos-duration="800"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(246, 201, 14, 0.1)';
            e.currentTarget.style.borderColor = '#526681';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.borderColor = '#E2E8F0';
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: '#FFFBEB',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Zap size={28} color="#526681" />
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0, marginBottom: '8px' }}>Draft Sessions</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#252c35', margin: 0 }}>{myDrafts.length}</p>
            <p style={{ fontSize: '12px', color: '#526681', margin: '12px 0 0 0' }}>Ready to submit</p>
          </div>

          {/* Average Rating */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            border: '2px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease'
          }}
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-duration="800"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.borderColor = '#EF4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.borderColor = '#E2E8F0';
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: '#FEF2F2',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Star size={28} color="#EF4444" fill="#EF4444" />
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0, marginBottom: '8px' }}>Average Rating</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#252c35', margin: 0 }}>{avgRating}</p>
            <p style={{ fontSize: '12px', color: '#EF4444', margin: '12px 0 0 0' }}>from {mySessions.length} sessions</p>
          </div>
        </div>

        {/* Two Column Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Quick Actions */}
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
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#111827',
                margin: 0
              }}>
                Quick Actions
              </h2>
            </div>
            <div style={{ padding: '16px' }}>
              {[
                { icon: Users, label: 'View My players', to: '/coach/players' },
                { icon: Plus, label: 'Start New Session', to: '/coach/start-session' },
                { icon: Award, label: 'My Profile', to: '/coach/profile' },
                { icon: BookOpen, label: 'Past Sessions', to: '/coach/past-sessions' }
              ].map((action, idx) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={idx}
                    to={action.to}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      background: '#F8FAFC',
                      borderRadius: '10px',
                      marginBottom: idx < 3 ? '10px' : 0,
                      cursor: 'pointer',
                      textDecoration: 'none',
                      color: '#111827',
                      transition: 'all 0.2s ease',
                      border: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#E8F2F8';
                      e.currentTarget.style.borderColor = '#526681';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#F8FAFC';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <Icon size={20} color="#526681" />
                      <span style={{ fontWeight: '600', fontSize: '14px' }}>{action.label}</span>
                    </div>
                    <ChevronRight size={18} color="#526681" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Sessions */}
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
                background: '#F0FDF4',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={24} color="#10B981" />
              </div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#111827',
                margin: 0
              }}>
                Recent Sessions
              </h2>
            </div>
            <div style={{ padding: '16px', maxHeight: '280px', overflowY: 'auto' }}>
              {mySessions.length === 0 ? (
                <div style={{
                  padding: '32px 16px',
                  textAlign: 'center',
                  color: '#64748B'
                }}>
                  <p>No sessions yet</p>
                </div>
              ) : (
                mySessions.slice(-4).reverse().map((session, idx) => (
                  <div
                    key={session.sessionId}
                    style={{
                      padding: '14px 16px',
                      borderBottom: idx < 3 ? '1px solid #F3F4F6' : 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <p style={{
                        margin: 0,
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827'
                      }}>
                        {session.student}
                      </p>
                      <p style={{
                        margin: '4px 0 0 0',
                        fontSize: '12px',
                        color: '#64748B'
                      }}>
                        {session.date}
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        background: session.status === 'completed' ? '#F0FDF4' : '#FFFBEB',
                        color: session.status === 'completed' ? '#10B981' : '#526681'
                      }}>
                        {session.status === 'completed' ? '✓' : '⏱'} {session.status}
                      </div>
                      {session.rating && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#EF4444'
                        }}>
                          <Star size={14} fill="#EF4444" color="#EF4444" />
                          {session.rating}/5
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Top Performers Section */}
        {topplayers.length > 0 && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '14px',
            border: '1.5px solid #E2E8F0',
            overflow: 'hidden',
            marginBottom: '32px',
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
                background: 'linear-gradient(135deg, #FFFBEB, #FEF2F2)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Award size={24} color="#EF4444" />
              </div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#111827',
                margin: 0
              }}>
                Top Performers This Month
              </h2>
            </div>
            <div style={{ padding: '20px' }}>
              {topplayers.map((student, idx) => {
                const medals = ['🥇', '🥈', '🥉'];
                return (
                  <div
                    key={student.playerId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px',
                      background: '#F8FAFC',
                      borderRadius: '10px',
                      marginBottom: idx < topplayers.length - 1 ? '12px' : 0
                    }}
                  >
                    <span style={{
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}>
                      {medals[idx]}
                    </span>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        margin: 0,
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827'
                      }}>
                        {student.name}
                      </p>
                      <p style={{
                        margin: '4px 0 0 0',
                        fontSize: '12px',
                        color: '#64748B'
                      }}>
                        Level {student.level} • Stage {student.stage}
                      </p>
                    </div>
                    <div style={{
                      textAlign: 'right'
                    }}>
                      <p style={{
                        margin: 0,
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#252c35'
                      }}>
                        {student.totalPoints}
                      </p>
                      <p style={{
                        margin: '4px 0 0 0',
                        fontSize: '11px',
                        color: '#64748B'
                      }}>
                        points
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* players List with Search and Filter */}
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
              <Users size={24} color="#526681" />
            </div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#111827',
              margin: 0
            }}>
              My players
            </h2>
            <span style={{
              marginLeft: 'auto',
              padding: '6px 12px',
              background: '#E8F2F8',
              color: '#252c35',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '700'
            }}>
              {filteredplayers.length}
            </span>
          </div>

          {/* Search and Filter Bar */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              flex: 1,
              minWidth: '200px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              background: '#F8FAFC',
              borderRadius: '10px',
              border: '1.5px solid #E2E8F0',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#526681';
              e.currentTarget.style.boxShadow = '0 0 0 4px rgba(82, 102, 129, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <Search size={18} color="#64748B" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '13px',
                  color: '#111827',
                  flex: 1,
                  fontWeight: '500'
                }}
              />
            </div>

            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              style={{
                padding: '10px 14px',
                background: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '500',
                color: '#111827',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#526681';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level === 'All' ? 'All Levels' : `Level ${level}`}
                </option>
              ))}
            </select>
          </div>

          {/* players Grid */}
          <div style={{
            padding: '20px'
          }}>
            {filteredplayers.length === 0 ? (
              <div style={{
                padding: '48px 32px',
                textAlign: 'center',
                color: '#64748B'
              }}>
                <AlertCircle size={40} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p style={{ fontSize: '15px', margin: 0 }}>No players found matching your filters</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px'
              }}>
                {filteredplayers.map((student) => (
                  <Link
                    key={student.playerId}
                    to={`/coach/student/${student.playerId}`}
                    style={{
                      background: '#F8FAFC',
                      border: '2px solid #E2E8F0',
                      borderRadius: '12px',
                      padding: '16px',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      color: '#111827'
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
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px'
                    }}>
                      <h3 style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        margin: 0,
                        color: '#111827'
                      }}>
                        {student.name}
                      </h3>
                      <span style={{
                        padding: '4px 10px',
                        background: '#E8F2F8',
                        color: '#252c35',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}>
                        L{student.level}
                      </span>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      marginBottom: '12px'
                    }}>
                      <div>
                        <p style={{
                          fontSize: '11px',
                          color: '#64748B',
                          margin: 0,
                          marginBottom: '4px'
                        }}>
                          Stage
                        </p>
                        <p style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#111827',
                          margin: 0
                        }}>
                          {student.stage}
                        </p>
                      </div>
                      <div>
                        <p style={{
                          fontSize: '11px',
                          color: '#64748B',
                          margin: 0,
                          marginBottom: '4px'
                        }}>
                          Points
                        </p>
                        <p style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#526681',
                          margin: 0
                        }}>
                          {student.totalPoints}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '6px'
                      }}>
                        <span style={{
                          fontSize: '11px',
                          color: '#64748B',
                          fontWeight: '600'
                        }}>
                          Progress
                        </span>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          color: '#252c35'
                        }}>
                          {student.progress}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '6px',
                        background: '#E2E8F0',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${student.progress}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #526681, #252c35)',
                          transition: 'width 0.5s ease'
                        }} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};


