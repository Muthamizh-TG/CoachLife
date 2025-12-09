import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/store';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { ProgressBar } from '../../components/ProgressBar';
import { Button } from '../../components/Button';
import { Table } from '../../components/Table';
import { User, Mail, Award, TrendingUp, MessageSquare, FileText, Download, Star, BookOpen, ArrowLeft, ChevronRight, Calendar, Zap, Target } from 'lucide-react';

export const StudentDetail = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const { getPlayerById, getSessionsByStudent } = useStore();

  const student = getPlayerById(playerId);
  const sessions = getSessionsByStudent(playerId);

  if (!student) {
    return (
      <Layout>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '48px 20px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <BookOpen size={48} style={{ margin: '0 auto 16px', opacity: 0.3, color: '#CBD5E1' }} />
            <p style={{ fontSize: '16px', color: '#64748B', margin: '0' }}>Student not found.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const completedSessions = sessions.filter((s) => s.status === 'completed').length;
  const avgRating = (sessions.reduce((sum, s) => sum + (s.rating || 0), 0) / sessions.length || 0).toFixed(1);
  const totalPoints = sessions.reduce((sum, s) => sum + (s.pointsEarned || 0), 0);

  return (
    <Layout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Back Button & Header */}
        <button
          onClick={() => navigate(-1)}
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
          Back
        </button>

        {/* Gradient Header with Student Info */}
        <div style={{
          background: 'linear-gradient(135deg, #0F4C81 0%, #1E88E5 100%)',
          borderRadius: '12px',
          padding: '32px',
          color: 'white',
          marginBottom: '32px',
          boxShadow: '0 4px 15px rgba(15, 76, 129, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '700',
            fontSize: '40px',
            flexShrink: 0
          }}>
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0' }}>
              {student.name}
            </h1>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '14px' }}>{student.email}</span>
              <span style={{ fontSize: '14px' }}>• Level {student.level}</span>
              <span style={{ fontSize: '14px' }}>• Stage {student.stage}</span>
            </div>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {/* Level Card */}
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
                <Target size={24} color="#1E88E5" />
              </div>
              <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '500' }}>Current Level</span>
            </div>
            <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0' }}>
              {student.level}
            </p>
          </div>

          {/* Stage Card */}
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
                <Zap size={24} color="#F6C90E" />
              </div>
              <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '500' }}>Current Stage</span>
            </div>
            <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0' }}>
              {student.stage}
            </p>
          </div>

          {/* Total Points Card */}
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
                <Award size={24} color="#10B981" />
              </div>
              <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '500' }}>Total Points</span>
            </div>
            <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0' }}>
              {student.totalPoints}
            </p>
          </div>

          {/* Sessions Card */}
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
                <BookOpen size={24} color="#0F4C81" />
              </div>
              <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '500' }}>Sessions Completed</span>
            </div>
            <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0' }}>
              {completedSessions}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0' }}>
              Overall Progress
            </h3>
            <span style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1E88E5'
            }}>
              {student.progress}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '12px',
            backgroundColor: '#E2E8F0',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${student.progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #1E88E5, #10B981)',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {/* Two Column Grid - Statistics & Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Statistics Card */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px', margin: '0 0 16px 0' }}>
              Detailed Statistics
            </h3>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                <div style={{ backgroundColor: '#E8F2F8', borderRadius: '6px', padding: '6px' }}>
                  <BookOpen size={18} color="#1E88E5" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: '0' }}>Sessions Completed</p>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0' }}>{completedSessions}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                <div style={{ backgroundColor: '#FFFBEB', borderRadius: '6px', padding: '6px' }}>
                  <Star size={18} color="#F6C90E" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: '0' }}>Average Rating</p>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0' }}>{avgRating}/5.0</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                <div style={{ backgroundColor: '#F0FDF4', borderRadius: '6px', padding: '6px' }}>
                  <Calendar size={18} color="#10B981" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: '0' }}>Join Date</p>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0' }}>{student.joinDate || 'N/A'}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                <div style={{ backgroundColor: '#FEF2F2', borderRadius: '6px', padding: '6px' }}>
                  <TrendingUp size={18} color='#EF4444' />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: '0' }}>Progress Status</p>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0' }}>{student.progress}% Completed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '16px', margin: '0 0 16px 0' }}>
              Quick Actions
            </h3>
            
            <div style={{ display: 'grid', gap: '10px' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 14px',
                backgroundColor: '#E8F2F8',
                border: '1px solid #1E88E5',
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#1E88E5',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1E88E5';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#E8F2F8';
                e.target.style.color = '#1E88E5';
              }}>
                <MessageSquare size={18} />
                Send Message
              </button>

              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 14px',
                backgroundColor: '#FFFBEB',
                border: '1px solid #F6C90E',
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#F6C90E',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#F6C90E';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FFFBEB';
                e.target.style.color = '#F6C90E';
              }}>
                <FileText size={18} />
                View Report
              </button>

              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 14px',
                backgroundColor: '#F0FDF4',
                border: '1px solid #10B981',
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#10B981',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#10B981';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#F0FDF4';
                e.target.style.color = '#10B981';
              }}>
                <Download size={18} />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Session History */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0' }}>
              Session History
            </h2>
            <span style={{
              backgroundColor: '#E8F2F8',
              color: '#0F4C81',
              fontSize: '12px',
              fontWeight: '600',
              padding: '4px 12px',
              borderRadius: '20px'
            }}>
              {sessions.length} total
            </span>
          </div>

          {sessions.length > 0 ? (
            <div style={{ display: 'grid', gap: '0' }}>
              {sessions.slice().reverse().map((session, index) => (
                <div
                  key={session.sessionId}
                  style={{
                    padding: '16px 20px',
                    borderBottom: index !== sessions.length - 1 ? '1px solid #E2E8F0' : 'none',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                    gap: '16px',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#F8FAFC'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  <div>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 4px 0' }}>Session</p>
                    <p style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0' }}>
                      #{session.sessionId}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 4px 0' }}>Date</p>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', margin: '0' }}>
                      {session.date || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 4px 0' }}>Status</p>
                    <Badge variant={session.status === 'completed' ? 'primary' : 'secondary'}>
                      {session.status === 'completed' ? '✓ Completed' : 'Draft'}
                    </Badge>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 4px 0' }}>Rating</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#F6C90E', margin: '0' }}>
                      {session.rating ? `⭐ ${session.rating}/5` : '-'}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 4px 0' }}>Points</p>
                    <p style={{ fontSize: '15px', fontWeight: '700', color: '#10B981', margin: '0' }}>
                      {session.pointsEarned || 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#999' }}>
              <BookOpen size={48} style={{ margin: '0 auto 16px', opacity: 0.3, color: '#CBD5E1' }} />
              <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px', color: '#64748B' }}>
                No sessions yet
              </p>
              <p style={{ fontSize: '14px', color: '#94A3B8', margin: '0' }}>
                Sessions will appear here once created
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
