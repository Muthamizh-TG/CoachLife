import { useState } from 'react';
import { useStore } from '../../context/store';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Users, Plus, Search, Filter, ChevronDown, Trash2, Edit3, Eye, TrendingUp, Award, Target, BarChart3 } from 'lucide-react';

export const Players = () => {
  const { players, addPlayer, updatePlayer, deletePlayer } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [levelFilter, setLevelFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: 1,
    stage: 1,
  });

  const filteredPlayers = players
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = levelFilter === 'all' || p.level === parseInt(levelFilter);
      const matchesStage = stageFilter === 'all' || p.stage === parseInt(stageFilter);
      return matchesSearch && matchesLevel && matchesStage;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'level') return b.level - a.level;
      if (sortBy === 'progress') return b.progress - a.progress;
      if (sortBy === 'points') return b.totalPoints - a.totalPoints;
      return 0;
    });

  const stats = {
    total: players.length,
    avgLevel: players.length > 0 ? (players.reduce((sum, p) => sum + p.level, 0) / players.length).toFixed(1) : 0,
    avgProgress: players.length > 0 ? Math.round(players.reduce((sum, p) => sum + p.progress, 0) / players.length) : 0,
    totalPoints: players.reduce((sum, p) => sum + p.totalPoints, 0),
  };

  const handleAddPlayer = () => {
    if (formData.name && formData.email) {
      addPlayer({
        ...formData,
        totalPoints: 0,
        progress: 0,
        primaryCoach: 'c1',
        joinDate: new Date().toISOString().split('T')[0],
      });
      setFormData({ name: '', email: '', level: 1, stage: 1 });
      setIsModalOpen(false);
    }
  };

  const columns = [
    { 
      key: 'playerId', 
      label: 'ID',
      render: (value) => <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#999', fontWeight: '600' }}>{value}</span>
    },
    { 
      key: 'name', 
      label: 'Name',
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #252c35, #526681)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            {value.charAt(0)}
          </div>
          <span style={{ fontWeight: '500', color: '#111827' }}>{value}</span>
        </div>
      )
    },
    { 
      key: 'email', 
      label: 'Email',
      render: (value) => <span style={{ fontSize: '13px', color: '#666' }}>{value}</span>
    },
    {
      key: 'level',
      label: 'Level',
      render: (value) => (
        <span style={{
          display: 'inline-block',
          padding: '6px 12px',
          backgroundColor: '#E8F2F8',
          color: '#252c35',
          borderRadius: '6px',
          fontWeight: '600',
          fontSize: '12px'
        }}>
          Lvl {value}
        </span>
      )
    },
    {
      key: 'stage',
      label: 'Stage',
      render: (value) => (
        <span style={{
          display: 'inline-block',
          padding: '6px 12px',
          backgroundColor: '#FFFBEB',
          color: '#526681',
          borderRadius: '6px',
          fontWeight: '600',
          fontSize: '12px'
        }}>
          Stage {value}
        </span>
      )
    },
    {
      key: 'totalPoints',
      label: 'Points',
      render: (value) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Award size={16} color="#10B981" />
          <span style={{ fontWeight: '700', color: '#10B981', fontSize: '14px' }}>{value}</span>
        </div>
      ),
    },
    {
      key: 'progress',
      label: 'Progress',
      render: (value) => (
        <div style={{ width: '100%', maxWidth: '120px' }}>
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: '#e5e7eb',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '4px'
          }}>
            <div style={{
              height: '100%',
              background: `linear-gradient(90deg, #252c35, #526681)`,
              width: `${value}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
          <span style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>{value}%</span>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="admin-page-container">
        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>Players Management</h1>
              <p style={{ fontSize: '14px', color: '#666', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} /> Manage {stats.total} player{stats.total !== 1 ? 's' : ''}, track progress, and monitor performance
              </p>
            </div>
            <Button 
              onClick={() => {
                setFormData({ name: '', email: '', level: 1, stage: 1 });
                setIsModalOpen(true);
              }} 
              variant="primary" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '12px 24px', 
                borderRadius: '8px', 
                fontWeight: '600',
                background: 'linear-gradient(135deg, #252c35, #526681)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(37, 44, 53, 0.3)'
              }}
            >
              <Plus size={18} /> Add New Player
            </Button>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.3s'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                background: '#E8F2F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={24} color="#252c35" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase' }}>Total Players</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>{stats.total}</p>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.3s'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                background: '#FFFBEB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Target size={24} color="#526681" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase' }}>Avg Level</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>{stats.avgLevel}</p>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.3s'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                background: '#F0FDF4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUp size={24} color="#10B981" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase' }}>Avg Progress</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>{stats.avgProgress}%</p>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.3s'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                background: '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Award size={24} color="#EF4444" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase' }}>Total Points</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>{stats.totalPoints}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto auto',
          gap: '12px',
          marginBottom: '24px',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '10px 14px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '2px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#526681';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(82, 102, 129, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
          }}>
            <Search size={18} color="#526681" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                border: 'none', 
                outline: 'none', 
                flex: 1, 
                fontSize: '14px', 
                background: 'transparent',
                color: '#111827',
                fontWeight: '500'
              }}
            />
            {searchTerm && (
              <span style={{
                fontSize: '12px',
                color: '#999',
                fontWeight: '600',
                backgroundColor: '#f3f4f6',
                padding: '4px 8px',
                borderRadius: '4px',
                whiteSpace: 'nowrap'
              }}>
                {filteredPlayers.length}
              </span>
            )}
          </div>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              minWidth: '120px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <option value="all">All Levels</option>
            {[1, 2, 3, 4, 5].map(l => <option key={l} value={l}>Level {l}</option>)}
          </select>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              minWidth: '120px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <option value="all">All Stages</option>
            {[1, 2, 3].map(s => <option key={s} value={s}>Stage {s}</option>)}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              minWidth: '120px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="level">Sort by Level</option>
            <option value="progress">Sort by Progress</option>
            <option value="points">Sort by Points</option>
          </select>
        </div>

        {/* Results Summary */}
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#666', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: '500' }}>Showing</span>
          <span style={{ fontWeight: '600', color: '#111827' }}>{filteredPlayers.length}</span>
          <span>of</span>
          <span style={{ fontWeight: '600', color: '#111827' }}>{players.length}</span>
          <span>players</span>
        </div>

        {/* Table Card */}
        <Card className="card-elevated" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', borderRadius: '12px', overflow: 'hidden' }}>
          {filteredPlayers.length > 0 ? (
            <Table
              columns={columns}
              data={filteredPlayers}
              actions={(row) => (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      borderRadius: '6px',
                      border: '1px solid #e5e7eb',
                      backgroundColor: '#f3f4f6',
                      color: '#111827',
                      cursor: 'pointer',
                      fontWeight: '500',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E8F2F8';
                      e.currentTarget.style.borderColor = '#526681';
                      e.currentTarget.style.color = '#526681';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.color = '#111827';
                    }}
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(row.playerId)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      borderRadius: '6px',
                      border: '1px solid #fee2e2',
                      backgroundColor: '#fef2f2',
                      color: '#dc2626',
                      cursor: 'pointer',
                      fontWeight: '500',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EF4444';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = '#EF4444';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fef2f2';
                      e.currentTarget.style.color = '#dc2626';
                      e.currentTarget.style.borderColor = '#fee2e2';
                    }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
              <Users size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>No players found</p>
              <p style={{ fontSize: '13px', color: '#bbb' }}>
                {searchTerm ? 'Try adjusting your search criteria' : 'Start by adding your first player'}
              </p>
            </div>
          )}
        </Card>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <Modal
            isOpen={!!deleteConfirm}
            onClose={() => setDeleteConfirm(null)}
            title="Delete Player"
          >
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Trash2 size={28} color="#EF4444" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>Delete this player?</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
                This action cannot be undone. The player and all associated data will be permanently deleted.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Button
                  onClick={() => setDeleteConfirm(null)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    backgroundColor: '#f3f4f6',
                    color: '#111827',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    deletePlayer(deleteConfirm);
                    setDeleteConfirm(null);
                  }}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    backgroundColor: '#EF4444',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  Delete Permanently
                </Button>
              </div>
            </div>
          </Modal>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Player"
        >
          <div style={{ padding: '24px' }}>
            {/* Form Header */}
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>
              Fill in the details below to create a new player account. All fields are required.
            </p>

            {/* Name Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                Player Name
              </label>
              <Input
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'all 0.3s'
                }}
              />
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                Email Address
              </label>
              <Input
                type="email"
                placeholder="player@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'all 0.3s'
                }}
              />
            </div>

            {/* Level and Stage Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                  Level
                </label>
                <select
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({ ...formData, level: Number(e.target.value) })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {[1, 2, 3, 4, 5].map((l) => (
                    <option key={l} value={l}>
                      Level {l}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                  Stage
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) =>
                    setFormData({ ...formData, stage: Number(e.target.value) })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {[1, 2, 3].map((s) => (
                    <option key={s} value={s}>
                      Stage {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="secondary"
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontWeight: '500',
                  backgroundColor: '#f3f4f6',
                  color: '#111827',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddPlayer}
                variant="success"
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontWeight: '500',
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                Create Player
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};


