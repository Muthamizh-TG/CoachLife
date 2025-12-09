import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/store';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Plus, Users, ArrowRight, Calendar, Award, Zap, ChevronRight, MessageSquare, Clock, TrendingUp, Target, User, CheckCircle, Activity, ArrowLeft, Search, Filter, AlertCircle, BookOpen } from 'lucide-react';

export const StartSession = () => {
  const store = useStore();
  const navigate = useNavigate();
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  const coachId = store.currentUser?.id;
  
  // Get coach's students
  let coachStudents = store.players?.filter(s => s.primaryCoach === coachId) || [];
  
  // Filter by search
  coachStudents = coachStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort students
  coachStudents = [...coachStudents].sort((a, b) => {
    switch(sortBy) {
      case 'progress':
        return b.progress - a.progress;
      case 'points':
        return b.totalPoints - a.totalPoints;
      case 'level':
        return b.level - a.level;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });
  
  // Get selected player data
  const selectedPlayer = coachStudents.find(s => s.playerId === selectedPlayerId);
  
  // Get sessions for selected player
  const playerSessions = selectedPlayerId ? store.getPlayerSessions(selectedPlayerId) || [] : [];
  
  // Separate new sessions (draft) and previous sessions (submitted)
  const newSessions = playerSessions.filter(s => s.status === 'draft');
  const previousSessions = playerSessions.filter(s => s.status === 'submitted');
  const completedCount = previousSessions.length;

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2.5rem 0',
    },
    contentWrapper: {
      maxWidth: '80rem',
      margin: '0 auto',
      padding: '0 1rem',
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '0.25rem',
    },
    subtitle: {
      color: '#64748b',
      marginTop: '0.25rem',
    },
    emptyState: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '3rem',
      textAlign: 'center',
      border: '1px solid #e2e8f0',
    },
    emptyIcon: {
      width: '4rem',
      height: '4rem',
      backgroundColor: '#f1f5f9',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem',
    },
    emptyTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.5rem',
    },
    emptyText: {
      color: '#64748b',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '1.5rem',
    },
    studentCard: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      border: '1px solid #e2e8f0',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'left',
    },
    studentCardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem',
    },
    studentInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    avatar: {
      width: '3rem',
      height: '3rem',
      backgroundColor: '#f1f5f9',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#64748b',
      fontWeight: '600',
      fontSize: '1.25rem',
    },
    studentName: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      color: '#1e293b',
    },
    studentEmail: {
      fontSize: '0.875rem',
      color: '#64748b',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem',
      marginTop: '1.25rem',
      paddingTop: '1.25rem',
      borderTop: '1px solid #f1f5f9',
    },
    statItem: {
      textAlign: 'center',
    },
    statLabel: {
      fontSize: '0.75rem',
      color: '#64748b',
      marginBottom: '0.25rem',
    },
    statValue: {
      fontWeight: 'bold',
      fontSize: '1rem',
      color: '#1e293b',
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: '#64748b',
      fontWeight: '600',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '1.5rem',
      transition: 'color 0.2s',
    },
    playerHeader: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      marginBottom: '2rem',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    playerHeaderContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
    },
    playerAvatar: {
      width: '4rem',
      height: '4rem',
      backgroundColor: '#f1f5f9',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#64748b',
      fontWeight: '600',
      fontSize: '1.5rem',
    },
    playerName: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1e293b',
    },
    playerEmail: {
      color: '#64748b',
    },
    statsRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1.25rem',
      marginBottom: '2.5rem',
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '1.25rem',
      border: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    statIcon: {
      width: '2.5rem',
      height: '2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    },
    statContent: {
      flex: 1,
    },
    statCardLabel: {
      fontSize: '0.875rem',
      color: '#64748b',
    },
    statCardValue: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1e293b',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '1rem',
    },
    sectionWrapper: {
      marginBottom: '2.5rem',
    },
    sessionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '1.5rem',
    },
    sessionCard: {
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.75rem',
      border: '2px solid #e2e8f0',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textDecoration: 'none',
      display: 'block',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      position: 'relative',
      overflow: 'hidden',
    },
    sessionHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '1.25rem',
      gap: '1rem',
    },
    badge: {
      fontSize: '0.6875rem',
      fontWeight: '700',
      padding: '0.375rem 0.875rem',
      borderRadius: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.375rem',
    },
    badgeDraft: {
      backgroundColor: '#fef3c7',
      color: '#92400e',
      border: '1.5px solid #fde68a',
      boxShadow: '0 1px 2px rgba(251, 191, 36, 0.1)',
    },
    badgeCompleted: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
      border: '1.5px solid #a7f3d0',
      boxShadow: '0 1px 2px rgba(16, 185, 129, 0.1)',
    },
    sessionTitle: {
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '1rem',
      fontSize: '1.125rem',
      lineHeight: '1.5',
      transition: 'color 0.2s',
    },
    sessionDate: {
      fontSize: '0.8125rem',
      color: '#64748b',
      fontWeight: '500',
      marginBottom: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    sessionInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.875rem',
      fontSize: '0.875rem',
      color: '#64748b',
    },
    sessionInfoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.625rem 0.875rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.5rem',
      fontWeight: '500',
    },
    sessionFooter: {
      marginTop: '1.25rem',
      paddingTop: '1.25rem',
      borderTop: '2px solid #f1f5f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.875rem',
      fontWeight: '700',
      color: '#3b82f6',
    },
    pointsBadge: {
      fontSize: '1rem',
      fontWeight: '700',
      color: 'white',
      backgroundColor: '#3b82f6',
      padding: '0.375rem 0.875rem',
      borderRadius: '0.5rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
    },
    ratingBadge: {
      fontSize: '0.9375rem',
      fontWeight: '700',
      color: '#f59e0b',
      backgroundColor: '#fffbeb',
      padding: '0.375rem 0.75rem',
      borderRadius: '0.5rem',
      border: '1.5px solid #fef3c7',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    feedbackText: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      padding: '0.875rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.5rem',
      marginTop: '0.25rem',
      border: '1px solid #e2e8f0',
    },
    feedbackContent: {
      fontSize: '0.8125rem',
      fontStyle: 'italic',
      color: '#475569',
      lineHeight: '1.5',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
    },
    actionButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#3b82f6',
      transition: 'gap 0.2s',
    },
  };

  return (
    <Layout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Students List View */}
        {!selectedPlayerId && (
          <>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #0F4C81 0%, #1E88E5 100%)',
              borderRadius: '12px',
              padding: '32px',
              color: 'white',
              marginBottom: '32px',
              boxShadow: '0 4px 15px rgba(15, 76, 129, 0.1)'
            }}>
              <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0' }}>
                My Players
              </h1>
              <p style={{ fontSize: '16px', opacity: 0.9, margin: '0' }}>
                Select a player to view their sessions and manage coaching activities
              </p>
            </div>
            
            {/* Search and Filter */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#1E88E5'
                }} />
                <input
                  type="text"
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    backgroundColor: 'white',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1E88E5'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                />
              </div>
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <option value="name">Sort by Name</option>
                  <option value="progress">Sort by Progress</option>
                  <option value="points">Sort by Points</option>
                  <option value="level">Sort by Level</option>
                </select>
              </div>
            </div>

            {/* Students Grid */}
            {coachStudents.length === 0 ? (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '48px 20px',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#E8F2F8',
                  borderRadius: '50%',
                  marginBottom: '16px'
                }}>
                  <Users size={40} color="#0F4C81" />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
                  No Players Assigned
                </h3>
                <p style={{ fontSize: '14px', color: '#64748B', margin: '0' }}>
                  When players are assigned to you, they will appear here.
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '20px'
              }}>
                {coachStudents.map(student => (
                  <button
                    key={student.playerId}
                    onClick={() => setSelectedPlayerId(student.playerId)}
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '20px',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #E2E8F0',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      textAlign: 'left',
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = '#1E88E5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#E2E8F0';
                    }}
                  >
                    {/* Header with Avatar and Chevron */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #F6C90E, #FFE082)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: '700',
                          fontSize: '20px'
                        }}>
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>
                            {student.name}
                          </h3>
                          <p style={{ fontSize: '13px', color: '#64748B', margin: '0' }}>
                            {student.email}
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={20} style={{ color: '#CBD5E1' }} />
                    </div>

                    {/* Badges */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <Badge variant="primary">L{student.level}</Badge>
                      <Badge variant="secondary">Stage {student.stage}</Badge>
                    </div>

                    {/* Stats Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                      paddingTop: '12px',
                      borderTop: '1px solid #E2E8F0'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 4px 0' }}>Progress</p>
                        <p style={{ fontSize: '18px', fontWeight: '700', color: '#10B981', margin: '0' }}>
                          {student.progress || 0}%
                        </p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 4px 0' }}>Points</p>
                        <p style={{ fontSize: '18px', fontWeight: '700', color: '#1E88E5', margin: '0' }}>
                          {student.totalPoints || 0}
                        </p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 4px 0' }}>Sessions</p>
                        <p style={{ fontSize: '18px', fontWeight: '700', color: '#F6C90E', margin: '0' }}>
                          {store.getPlayerSessions(student.playerId)?.length || 0}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Sessions View */}
        {selectedPlayerId && selectedPlayer && (
          <>
            {/* Back Button & Header */}
            <button
              onClick={() => setSelectedPlayerId(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(30, 136, 229, 0.1)',
                color: '#1E88E5',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                marginBottom: '24px',
                transition: 'all 0.3s',
                fontSize: '14px',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(30, 136, 229, 0.2)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(30, 136, 229, 0.1)'}
            >
              <ArrowLeft size={16} />
              Back to All Players
            </button>

            {/* Player Header */}
            <div style={{
              background: 'linear-gradient(135deg, #0F4C81 0%, #1E88E5 100%)',
              borderRadius: '12px',
              padding: '32px',
              color: 'white',
              marginBottom: '32px',
              boxShadow: '0 4px 15px rgba(15, 76, 129, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '32px'
                }}>
                  {selectedPlayer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 4px 0' }}>
                    {selectedPlayer.name}
                  </h1>
                  <p style={{ fontSize: '14px', opacity: 0.9, margin: '0' }}>
                    {selectedPlayer.email} • Level {selectedPlayer.level}
                  </p>
                </div>
              </div>
            </div>

            {/* Sessions Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginBottom: '32px'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                borderLeft: '4px solid #1E88E5',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ backgroundColor: '#E8F2F8', borderRadius: '8px', padding: '8px' }}>
                    <BookOpen size={24} color="#1E88E5" />
                  </div>
                  <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '500' }}>Total Sessions</span>
                </div>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0' }}>
                  {playerSessions.length}
                </p>
              </div>

              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                borderLeft: '4px solid #10B981',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ backgroundColor: '#F0FDF4', borderRadius: '8px', padding: '8px' }}>
                    <CheckCircle size={24} color="#10B981" />
                  </div>
                  <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '500' }}>Submitted</span>
                </div>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0' }}>
                  {completedCount}
                </p>
              </div>

              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                borderLeft: '4px solid #F6C90E',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ backgroundColor: '#FFFBEB', borderRadius: '8px', padding: '8px' }}>
                    <Clock size={24} color="#F6C90E" />
                  </div>
                  <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '500' }}>Draft Sessions</span>
                </div>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0' }}>
                  {newSessions.length}
                </p>
              </div>

              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                borderLeft: '4px solid #0F4C81',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ backgroundColor: '#E8F2F8', borderRadius: '8px', padding: '8px' }}>
                    <Award size={24} color="#0F4C81" />
                  </div>
                  <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '500' }}>Total Points</span>
                </div>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0' }}>
                  {playerSessions.reduce((sum, s) => sum + (s.pointsEarned || 0), 0)}
                </p>
              </div>
            </div>

            {/* Draft/Upcoming Sessions Section */}
            {newSessions.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #E2E8F0'
                }}>
                  <Clock size={20} color="#F6C90E" />
                  <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0' }}>
                    Draft Sessions
                  </h2>
                  <span style={{
                    backgroundColor: '#FFFBEB',
                    color: '#F6C90E',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    marginLeft: 'auto'
                  }}>
                    {newSessions.length}
                  </span>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '16px'
                }}>
                  {newSessions.map(session => (
                    <Link
                      key={session.sessionId}
                      to={`/session/${session.sessionId}`}
                      style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid #FDE68A',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.3s',
                        borderLeft: '4px solid #F6C90E'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0' }}>
                          Session #{session.sessionId}
                        </h3>
                        <Badge variant="secondary">Draft</Badge>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748B', marginBottom: '12px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={14} />
                          {new Date(session.sessionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Award size={14} />
                          {session.defaultPoints + session.bonusPoints} pts
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1E88E5', fontSize: '13px', fontWeight: '500' }}>
                        Edit <ChevronRight size={14} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Completed/Submitted Sessions Section */}
            {previousSessions.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #E2E8F0'
                }}>
                  <CheckCircle size={20} color="#10B981" />
                  <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0' }}>
                    Completed Sessions
                  </h2>
                  <span style={{
                    backgroundColor: '#F0FDF4',
                    color: '#10B981',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    marginLeft: 'auto'
                  }}>
                    {previousSessions.length}
                  </span>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '16px'
                }}>
                  {previousSessions.map(session => (
                    <Link
                      key={session.sessionId}
                      to={`/session/${session.sessionId}`}
                      style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid #A7F3D0',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.3s',
                        borderLeft: '4px solid #10B981'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0' }}>
                          Session #{session.sessionId}
                        </h3>
                        <Badge variant="primary">✓ Completed</Badge>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748B', marginBottom: '12px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={14} />
                          {new Date(session.sessionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Award size={14} />
                          {session.pointsEarned || 0} pts
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          ⭐ {session.rating || 'N/A'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '13px', fontWeight: '500' }}>
                        View <ChevronRight size={14} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {playerSessions.length === 0 && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '48px 20px',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#E8F2F8',
                  borderRadius: '50%',
                  marginBottom: '16px'
                }}>
                  <BookOpen size={40} color="#0F4C81" />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' }}>
                  No Sessions Yet
                </h3>
                <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 20px 0' }}>
                  Create a session to get started
                </p>
                <button
                  onClick={() => navigate(`/coach/start-session`)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    backgroundColor: '#1E88E5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1565B8'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#1E88E5'}
                >
                  <Plus size={18} />
                  Create Session
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
