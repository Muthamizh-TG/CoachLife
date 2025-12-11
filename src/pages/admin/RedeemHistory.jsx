import { useStore } from '../../context/store';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Table } from '../../components/Table';
import { Gift, CheckCircle, Clock, BarChart3, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export const RedeemHistory = () => {
  const { redeemHistory, rewards, players } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const getRewardIcon = (rewardId) => {
    const reward = rewards.find((r) => r.rewardId === rewardId);
    return reward?.icon || '🎁';
  };

  const getPlayerName = (playerId) => {
    const player = players.find((p) => p.playerId === playerId);
    return player?.name || 'Unknown';
  };

  const getRewardName = (rewardId) => {
    const reward = rewards.find((r) => r.rewardId === rewardId);
    return reward?.name || 'Unknown';
  };

  const totalPoints = redeemHistory.reduce((sum, r) => sum + r.pointsUsed, 0);
  const completedCount = redeemHistory.filter((r) => r.status === 'completed').length;
  const pendingCount = redeemHistory.filter((r) => r.status === 'pending').length;

  const filteredHistory = redeemHistory.filter(record => {
    const matchesSearch = getPlayerName(record.playerId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getRewardName(record.rewardId).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'points-high') return b.pointsUsed - a.pointsUsed;
    if (sortBy === 'points-low') return a.pointsUsed - b.pointsUsed;
    return 0;
  });

  const columns = [
    { key: 'redeemId', label: 'ID', width: '80px' },
    {
      key: 'rewardName',
      label: 'Reward',
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>{getRewardIcon(row.rewardId)}</span>
          <span style={{ fontWeight: '500' }}>{value}</span>
        </div>
      ),
    },
    {
      key: 'playerId',
      label: 'Player',
      render: (value) => (
        <div style={{ fontWeight: '500', color: '#252c35' }}>{getPlayerName(value)}</div>
      ),
    },
    {
      key: 'pointsUsed',
      label: 'Points',
      render: (value) => (
        <div style={{
          display: 'inline-block',
          padding: '6px 10px',
          backgroundColor: '#FFFBEB',
          color: '#92400e',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '700'
        }}>
          {value} pts
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (value) => (
        <span style={{ color: '#666', fontSize: '13px' }}>{value}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          backgroundColor: value === 'completed' ? '#F0FDF4' : '#FFFBEB',
          color: value === 'completed' ? '#15803d' : '#92400e',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '700'
        }}>
          {value === 'completed' ? <CheckCircle size={14} /> : <Clock size={14} />}
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </div>
      ),
    },
  ];

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
        }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Redeem History</h1>
            <p style={{ fontSize: '14px', opacity: 0.95, margin: 0 }}>Track reward redemptions and player engagement</p>
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
          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: '#E8F2F8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BarChart3 size={24} color="#252c35" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Total Redeems</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{redeemHistory.length}</p>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: '#F0FDF4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle size={24} color="#10B981" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Completed</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{completedCount}</p>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: '#FFFBEB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Clock size={24} color="#526681" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Pending</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{pendingCount}</p>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: '#FFFBEB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Gift size={24} color="#526681" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Total Points Used</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{totalPoints}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
              <Search size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#526681'
              }} />
              <input
                type="text"
                placeholder="Search by player or reward..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 10px 10px 40px',
                  border: '2px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#526681';
                  e.target.style.boxShadow = '0 0 0 3px rgba(82, 102, 129, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '2px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: 'white',
                color: '#111827',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '2px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: 'white',
                color: '#111827',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="points-high">Highest Points</option>
              <option value="points-low">Lowest Points</option>
            </select>
          </div>

          {/* History Table */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            marginBottom: '32px'
          }}>
            {sortedHistory.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <Table columns={columns} data={sortedHistory} />
              </div>
            ) : (
              <div style={{
                padding: '48px 24px',
                textAlign: 'center'
              }}>
                <Gift size={48} style={{ color: '#D1D5DB', margin: '0 auto 16px' }} />
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', margin: '0' }}>No redemptions found</p>
                <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '4px 0 0 0' }}>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};


