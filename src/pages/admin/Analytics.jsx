import { useStore } from '../../context/store';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { ProgressBar } from '../../components/ProgressBar';
import { Users, Award, TrendingUp, BarChart3, Star, Trophy, Target, Zap, CheckCircle2 } from 'lucide-react';

export const Analytics = () => {
  const { players, coaches, sessionHistory, sessionDrafts, rewards, redeemHistory } = useStore();

  const totalPlayers = players.length;
  const totalCoaches = coaches.length;
  const totalSessions = sessionHistory.length;
  const completedSessions = sessionHistory.filter((s) => s.status === 'completed').length;
  const draftSessions = sessionDrafts.length;
  const totalRedeems = redeemHistory.length;
  const totalPointsEarned = players.reduce((sum, p) => sum + p.totalPoints, 0);
  const avgPlayerPoints = (totalPointsEarned / totalPlayers).toFixed(0);
  const avgCoachRating = (
    coaches.reduce((sum, c) => sum + c.rating, 0) / totalCoaches
  ).toFixed(1);

  const playerLevels = players.reduce((acc, p) => {
    acc[p.level] = (acc[p.level] || 0) + 1;
    return acc;
  }, {});

  const playerStages = players.reduce((acc, p) => {
    acc[p.stage] = (acc[p.stage] || 0) + 1;
    return acc;
  }, {});

  const avgSessionRating = (
    sessionHistory.reduce((sum, s) => sum + (s.rating || 0), 0) / totalSessions
  ).toFixed(1);

  return (
    <Layout>
      <div style={{ maxWidth: '100%', padding: '0' }}>
        {/* Enhanced Header */}
        <div style={{
          background: 'linear-gradient(135deg, #252c35 0%, #526681 100%)',
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
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', margin: 0 }}>Analytics</h1>
            <p style={{ fontSize: '14px', opacity: 0.95, margin: 0 }}>Comprehensive system performance and user metrics</p>
          </div>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BarChart3 size={32} />
          </div>
        </div>

        <div style={{ padding: '0 32px' }}>
          {/* Key Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800">
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: '#E8F2F8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users size={24} color="#252c35" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Total Players</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{totalPlayers}</p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: '#F0FDF4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Award size={24} color="#10B981" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Total Coaches</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{totalCoaches}</p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: '#FFFBEB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle2 size={24} color="#526681" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Completed Sessions</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{completedSessions}</p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: '#FEF2F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={24} color="#EF4444" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Draft Sessions</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{draftSessions}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Analytics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            {/* Session Performance */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '16px', margin: '0 0 16px 0' }}>Session Performance</h3>
              
              {/* Completion Rate */}
              <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>Completion Rate</span>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    backgroundColor: '#E8F2F8',
                    color: '#252c35',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    {((completedSessions / totalSessions) * 100).toFixed(0)}%
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #252c35, #526681)',
                    width: `${((completedSessions / totalSessions) * 100)}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <p style={{ fontSize: '11px', color: '#666', margin: '8px 0 0 0' }}>
                  {completedSessions} of {totalSessions} sessions completed
                </p>
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: '#FFFBEB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Star size={20} color="#526681" />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', margin: 0 }}>Avg Session Rating</p>
                    <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '2px 0 0 0' }}>{avgSessionRating}/5.0</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: '#F0FDF4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Trophy size={20} color="#10B981" />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', margin: 0 }}>Avg Coach Rating</p>
                    <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '2px 0 0 0' }}>{avgCoachRating}/5.0</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: '#E8F2F8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <TrendingUp size={20} color="#252c35" />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', margin: 0 }}>Total Sessions</p>
                    <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '2px 0 0 0' }}>{totalSessions}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Points & Rewards */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '16px', margin: '0 0 16px 0' }}>Points & Rewards</h3>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#F0FDF4',
                  borderRadius: '8px',
                  border: '1px solid #DCFCE7'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#15803d', fontWeight: '600', textTransform: 'uppercase' }}>Total Points Earned</span>
                    <TrendingUp size={18} color="#10B981" />
                  </div>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>{totalPointsEarned}</p>
                  <p style={{ fontSize: '11px', color: '#666', margin: '4px 0 0 0' }}>Across all players</p>
                </div>

                <div style={{
                  padding: '16px',
                  backgroundColor: '#FFFBEB',
                  borderRadius: '8px',
                  border: '1px solid #FEF3C7'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#92400e', fontWeight: '600', textTransform: 'uppercase' }}>Avg Points/Player</span>
                    <Target size={18} color="#526681" />
                  </div>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>{avgPlayerPoints}</p>
                  <p style={{ fontSize: '11px', color: '#666', margin: '4px 0 0 0' }}>Per player average</p>
                </div>

                <div style={{
                  padding: '16px',
                  backgroundColor: '#E8F2F8',
                  borderRadius: '8px',
                  border: '1px solid #D1E9F6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#0c4a6e', fontWeight: '600', textTransform: 'uppercase' }}>Rewards Redeemed</span>
                    <Trophy size={18} color="#252c35" />
                  </div>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>{totalRedeems}</p>
                  <p style={{ fontSize: '11px', color: '#666', margin: '4px 0 0 0' }}>Total redemptions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Distribution Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            {/* Players by Level */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '16px', margin: '0 0 16px 0' }}>Players by Level</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(playerLevels)
                  .sort(([a], [b]) => a - b)
                  .map(([level, count]) => (
                    <div key={level}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>Level {level}</span>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          backgroundColor: '#E8F2F8',
                          color: '#252c35',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}>
                          {count}
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, #252c35, #526681)',
                          width: `${((count / totalPlayers) * 100)}%`,
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                      <p style={{ fontSize: '10px', color: '#999', margin: '4px 0 0 0' }}>
                        {((count / totalPlayers) * 100).toFixed(1)}% of total
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Players by Stage */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '16px', margin: '0 0 16px 0' }}>Players by Stage</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(playerStages)
                  .sort(([a], [b]) => a - b)
                  .map(([stage, count]) => (
                    <div key={stage}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>Stage {stage}</span>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          backgroundColor: '#FFFBEB',
                          color: '#526681',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}>
                          {count}
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, #252c35, #526681)',
                          width: `${((count / totalPlayers) * 100)}%`,
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                      <p style={{ fontSize: '10px', color: '#999', margin: '4px 0 0 0' }}>
                        {((count / totalPlayers) * 100).toFixed(1)}% of total
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};


