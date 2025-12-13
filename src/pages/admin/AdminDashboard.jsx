import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/store';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Users, TrendingUp, Award, Zap, BarChart3, Settings, Target, CheckCircle2, AlertCircle, BookOpen, Trophy, Link2 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const AdminDashboard = () => {
  const { players, coaches, sessionHistory, rewards } = useStore();

  const totalPlayers = players.length;
  const totalCoaches = coaches.length;
  const totalSessions = sessionHistory.length;
  const completedSessions = sessionHistory.filter(s => s.status === 'completed').length;
  const draftSessions = sessionHistory.filter(s => s.status === 'draft').length;
  const submittedSessions = sessionHistory.filter(s => s.status === 'submitted').length;
  const averageRating = totalSessions > 0 ? (
    sessionHistory.reduce((sum, s) => sum + (s.rating || 0), 0) / totalSessions
  ).toFixed(1) : 0;
  
  const assignedPlayers = players.filter(p => p.primaryCoach).length;
  const unassignedPlayers = players.filter(p => !p.primaryCoach).length;
  const activeCoaches = coaches.filter(c => c.assignedPlayers && c.assignedPlayers.length > 0).length;
  const completionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  const topPerformers = players
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 5);

  // Chart Data: Session Status Distribution
  const sessionStatusData = [
    { name: 'Submitted', value: submittedSessions, fill: '#10B981' },
    { name: 'Draft', value: draftSessions, fill: '#060030ff' },
    { name: 'Completed', value: completedSessions, fill: '#252c35' }
  ];

  // Chart Data: Player Progress Distribution
  const playerLevelData = [
    { level: 'Level 1', count: players.filter(p => p.level === 1).length },
    { level: 'Level 2', count: players.filter(p => p.level === 2).length },
    { level: 'Level 3', count: players.filter(p => p.level === 3).length },
    { level: 'Level 4', count: players.filter(p => p.level === 4).length },
    { level: 'Level 5', count: players.filter(p => p.level === 5).length }
  ];

  // Chart Data: Coach Performance (Sessions per Coach)
  const coachPerformanceData = coaches.slice(0, 8).map(coach => ({
    name: coach.name || `Coach ${coach.id}`,
    sessions: sessionHistory.filter(s => s.coachId === coach.id).length,
    avgRating: sessionHistory.filter(s => s.coachId === coach.id).length > 0 
      ? (sessionHistory.filter(s => s.coachId === coach.id).reduce((sum, s) => sum + (s.rating || 0), 0) / 
          sessionHistory.filter(s => s.coachId === coach.id).length).toFixed(1)
      : 0
  }));

  // Chart Data: Player Points Distribution
  const topPlayersForChart = players
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 10)
    .map(p => ({
      name: p.name,
      points: p.totalPoints,
      progress: p.progress
    }));

  return (
    <Layout>
      <div style={{ maxWidth: '100%', padding: '0' }}>
        {/* Enhanced Header */}
        <div style={{
          background: 'linear-gradient(135deg, #060030ff 0%, #000000ff 100%)',
          color: 'white',
          padding: '40px 32px',
          marginBottom: '32px',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        data-aos="fade-up"
        data-aos-duration="800">
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', margin: 0 }}>Admin Dashboard</h1>
            <p style={{ fontSize: '14px', opacity: 0.95, margin: 0 }}>Welcome back! Here's your system overview</p>
          </div>
          <Link to="/admin/analytics" style={{ textDecoration: 'none' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid white',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            >
              <BarChart3 size={18} /> View Analytics
            </button>
          </Link>
        </div>

        <div style={{ padding: '0 32px' }}>
          {/* Primary Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800">
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: '#E8F2F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={28} color="#252c35" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Total Players</p>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{totalPlayers}</p>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: '#F0FDF4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Award size={28} color="#10B981" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Total Coaches</p>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{totalCoaches}</p>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: '#FFFBEB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={28} color="#060030ff" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Total Sessions</p>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{totalSessions}</p>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle2 size={28} color="#EF4444" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Completed Sessions</p>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{completedSessions}</p>
              </div>
            </div>
          </div>

          

          {/* Main Grid: Quick Actions & Top Performers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            {/* Quick Actions */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '16px', margin: '0 0 16px 0' }}>Quick Actions</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {[
                  { to: '/admin/players', icon: Users, label: 'Manage Players' },
                  { to: '/admin/coaches', icon: Award, label: 'Manage Coaches' },
                  { to: '/admin/assign-players', icon: Link2, label: 'Assign Players' },
                  { to: '/admin/rewards', icon: Trophy, label: 'Manage Rewards' },
                  { to: '/admin/learning-pathway', icon: TrendingUp, label: 'Learning Path' },
                  { to: '/admin/redeem-history', icon: Zap, label: 'Redeem History' },
                ].map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <Link key={idx} to={action.to} style={{ textDecoration: 'none' }}>
                      <button style={{
                        width: '100%',
                        padding: '16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#111827',
                        fontWeight: '500',
                        fontSize: '13px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#060030ff';
                        e.currentTarget.style.backgroundColor = '#E8F2F8';
                        e.currentTarget.style.color = '#060030ff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        e.currentTarget.style.color = '#111827';
                      }}>
                        <Icon size={20} />
                        {action.label}
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Top Performers */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '16px', margin: '0 0 16px 0' }}>Top Performers 🏆</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {topPerformers.map((player, idx) => (
                  <div key={player.playerId} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: idx === 0 ? 'linear-gradient(135deg, #FFD700, #FFA500)' : idx === 1 ? 'linear-gradient(135deg, #C0C0C0, #A9A9A9)' : 'linear-gradient(135deg, #CD7F32, #8B4513)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>
                      {idx + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>{player.name}</p>
                      <p style={{ fontSize: '11px', color: '#666', margin: '2px 0 0 0' }}>Level {player.level}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '13px', fontWeight: '700', color: '#252c35', margin: 0 }}>{player.totalPoints}pts</p>
                      <p style={{ fontSize: '11px', color: '#666', margin: '2px 0 0 0' }}>{player.progress}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div style={{ marginBottom: '32px', marginTop: '40px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              marginBottom: '24px',
              paddingBottom: '12px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '24px',
                background: 'linear-gradient(135deg, #060030ff 0%, #000000ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                📊
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1f2937', margin: 0 }}>Analytics</h2>
            </div>
            
            {/* Charts Grid - 2 columns, compact */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
              
              {/* Session Status Pie Chart */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 44, 53, 0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#252c35', marginBottom: '12px', margin: '0 0 12px 0' }}>Session Status</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={sessionStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      animationDuration={1000}
                    >
                      {sessionStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Player Level Distribution Bar Chart */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(82, 102, 129, 0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#060030ff', marginBottom: '12px', margin: '0 0 12px 0' }}>Players by Level</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={playerLevelData} margin={{ top: 10, right: 15, bottom: 15, left: -5 }}>
                    <defs>
                      <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#060030ff" stopOpacity={1}/>
                        <stop offset="95%" stopColor="#252c35" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="level" stroke="#999" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#999" style={{ fontSize: '11px' }} width={25} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', padding: '8px' }} cursor={{ fill: 'rgba(82, 102, 129, 0.1)' }} />
                    <Bar dataKey="count" fill="url(#colorLevel)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              
              {/* Top Players Points Line Chart */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 44, 53, 0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#252c35', marginBottom: '12px', margin: '0 0 12px 0' }}>Top Players Performance</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={topPlayersForChart} margin={{ top: 10, right: 15, bottom: 60, left: -5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} stroke="#999" style={{ fontSize: '10px' }} />
                    <YAxis stroke="#999" style={{ fontSize: '11px' }} width={25} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px', padding: '8px' }} />
                    <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                    <Line 
                      type="linear" 
                      dataKey="points" 
                      stroke="#252c35" 
                      strokeWidth={2.5} 
                      dot={{ fill: '#252c35', r: 3 }} 
                      activeDot={{ r: 5 }}
                      animationDuration={1000}
                    />
                    <Line 
                      type="linear" 
                      dataKey="progress" 
                      stroke="#060030ff" 
                      strokeWidth={2.5} 
                      dot={{ fill: '#060030ff', r: 3 }} 
                      activeDot={{ r: 5 }}
                      animationDuration={1000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};


