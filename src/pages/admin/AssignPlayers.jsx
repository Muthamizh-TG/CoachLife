import { useState } from 'react';
import { useStore } from '../../context/store';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { Users, UserCheck, X, Search, Filter, CheckCircle2, AlertCircle, Link2 } from 'lucide-react';

export const AssignPlayers = () => {
  const { players, coaches, assignPlayerToCoach } = useStore();
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedCoach, setSelectedCoach] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCoach, setFilterCoach] = useState('all');
  const [assignmentSuccess, setAssignmentSuccess] = useState(null);

  const handleAssign = () => {
    if (selectedPlayer && selectedCoach) {
      assignPlayerToCoach(selectedPlayer, selectedCoach);
      setAssignmentSuccess({
        player: players.find(p => p.playerId === selectedPlayer)?.name,
        coach: coaches.find(c => c.coachId === selectedCoach)?.name
      });
      setSelectedPlayer('');
      setSelectedCoach('');
      setTimeout(() => setAssignmentSuccess(null), 3000);
    }
  };

  const playerOptions = [
    { value: '', label: 'Select a player...' },
    ...players.map((p) => ({
      value: p.playerId,
      label: `${p.name} (Level ${p.level})`,
    }))
  ];

  const coachOptions = [
    { value: '', label: 'Select a coach...' },
    ...coaches.map((c) => ({
      value: c.coachId,
      label: `${c.name} (${c.specialization})`,
    }))
  ];

  const assignments = coaches.map((coach) => ({
    coach,
    players: players.filter((p) => p.primaryCoach === coach.coachId),
  }));

  const filteredAssignments = assignments
    .filter(a => {
      const matchesCoachFilter = filterCoach === 'all' || a.coach.coachId === filterCoach;
      const matchesSearch = a.players.some(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesCoachFilter && (searchTerm === '' || matchesSearch);
    })
    .filter(a => a.players.length > 0);

  const stats = {
    totalPlayers: players.length,
    assignedPlayers: players.filter(p => p.primaryCoach).length,
    unassignedPlayers: players.filter(p => !p.primaryCoach).length,
    totalAssignments: assignments.reduce((sum, a) => sum + a.players.length, 0),
  };

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
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Assign Players to Coaches</h1>
            <p style={{ fontSize: '14px', opacity: 0.95, margin: 0 }}>Manage player-coach relationships and assignments</p>
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
            <UserCheck size={32} />
          </div>
        </div>

        <div style={{ padding: '0 32px' }}>
          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800">
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '2px solid #E2E8F0',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(82, 102, 129, 0.1)';
              e.currentTarget.style.borderColor = '#526681';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
            data-aos="zoom-in"
            data-aos-duration="800">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
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
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{stats.totalPlayers}</p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '2px solid #E2E8F0',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(82, 102, 129, 0.1)';
              e.currentTarget.style.borderColor = '#526681';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
            data-aos="zoom-in"
            data-aos-delay="100"
            data-aos-duration="800">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: '#F0FDF4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle2 size={24} color="#10B981" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Assigned</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{stats.assignedPlayers}</p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '2px solid #E2E8F0',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(82, 102, 129, 0.1)';
              e.currentTarget.style.borderColor = '#526681';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
            data-aos="zoom-in"
            data-aos-delay="200"
            data-aos-duration="800">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: '#FEF2F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AlertCircle size={24} color="#EF4444" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Unassigned</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{stats.unassignedPlayers}</p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '2px solid #E2E8F0',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(82, 102, 129, 0.1)';
              e.currentTarget.style.borderColor = '#526681';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
            data-aos="zoom-in"
            data-aos-delay="300"
            data-aos-duration="800">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: '#FFFBEB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Link2 size={24} color="#526681" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Total Assignments</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{stats.totalAssignments}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assignment Form Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '2px solid #E2E8F0',
          marginBottom: '32px',
          marginLeft: '32px',
          marginRight: '32px',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(82, 102, 129, 0.1)';
          e.currentTarget.style.borderColor = '#526681';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.borderColor = '#E2E8F0';
        }}
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="800">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #252c35, #526681)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UserCheck size={20} color="white" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>New Assignment</h3>
              <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 0 0' }}>Assign a player to a coach</p>
            </div>
          </div>

          {assignmentSuccess && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#F0FDF4',
              border: '1px solid #86EFAC',
              borderRadius: '8px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#166534'
            }}>
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '13px', fontWeight: '500' }}>
                {assignmentSuccess.player} assigned to {assignmentSuccess.coach} ✓
              </span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '16px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                Select Player
              </label>
              <select
                value={selectedPlayer}
                onChange={(e) => setSelectedPlayer(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#526681';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(82, 102, 129, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {playerOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                Select Coach
              </label>
              <select
                value={selectedCoach}
                onChange={(e) => setSelectedCoach(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#526681';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(82, 102, 129, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {coachOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAssign}
              disabled={!selectedPlayer || !selectedCoach}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                background: selectedPlayer && selectedCoach ? 'linear-gradient(135deg, #252c35, #526681)' : '#e5e7eb',
                color: selectedPlayer && selectedCoach ? 'white' : '#999',
                border: 'none',
                cursor: selectedPlayer && selectedCoach ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s',
                boxShadow: selectedPlayer && selectedCoach ? '0 4px 12px rgba(37, 44, 53, 0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (selectedPlayer && selectedCoach) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 44, 53, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPlayer && selectedCoach) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 44, 53, 0.3)';
                }
              }}
            >
              <Link2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
              Assign Player
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '16px',
          marginBottom: '24px',
          alignItems: 'center',
          padding: '0 32px'
        }}
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="800">
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '10px 14px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '2px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s'
          }}>
            <Search size={18} color="#526681" />
            <input
              type="text"
              placeholder="Search players..."
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
              onFocus={(e) => {
                e.target.parentElement.style.borderColor = '#526681';
                e.target.parentElement.style.boxShadow = '0 0 0 3px rgba(82, 102, 129, 0.1)';
              }}
              onBlur={(e) => {
                e.target.parentElement.style.borderColor = '#E2E8F0';
                e.target.parentElement.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            />
          </div>

          <select
            value={filterCoach}
            onChange={(e) => setFilterCoach(e.target.value)}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              border: '2px solid #E2E8F0',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              minWidth: '150px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#526681';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(82, 102, 129, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            <option value="all">All Coaches</option>
            {coaches.map(c => (
              <option key={c.coachId} value={c.coachId}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Assignments Section */}
        <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="800" style={{ padding: '0 32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
            Current Assignments ({filteredAssignments.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((assignment) => (
                <div
                  key={assignment.coach.coachId}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '2px solid #E2E8F0',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(82, 102, 129, 0.1)';
                    e.currentTarget.style.borderColor = '#526681';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  data-aos="zoom-in"
                  data-aos-duration="800"
                >
                  {/* Coach Header */}
                  <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '2px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
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
                        {assignment.coach.name.charAt(0)}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: 0 }}>
                          {assignment.coach.name}
                        </h4>
                        <p style={{ fontSize: '12px', color: '#666', margin: '2px 0 0 0' }}>
                          {assignment.coach.specialization}
                        </p>
                      </div>
                    </div>
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: '#E8F2F8',
                      color: '#252c35',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      border: '1px solid #526681',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#526681';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#E8F2F8';
                      e.currentTarget.style.color = '#252c35';
                    }}>
                      {assignment.players.length} student{assignment.players.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* players List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {assignment.players.map((student) => (
                      <div
                        key={student.playerId}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px',
                          backgroundColor: '#F8FAFC',
                          borderRadius: '8px',
                          border: '2px solid #E2E8F0',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#EEF4F8';
                          e.currentTarget.style.borderColor = '#526681';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#F8FAFC';
                          e.currentTarget.style.borderColor = '#E2E8F0';
                        }}
                      >
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>
                            {student.name}
                          </p>
                          <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 0 0' }}>
                            Level {student.level} • {student.totalPoints} pts
                          </p>
                        </div>
                        <button
                          onClick={() => alert('Remove functionality would go here')}
                          style={{
                            padding: '6px 8px',
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fee2e2',
                            borderRadius: '6px',
                            color: '#dc2626',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
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
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '60px 20px',
                color: '#999'
              }}>
                <Users size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>No assignments found</p>
                <p style={{ fontSize: '13px', color: '#bbb' }}>
                  {searchTerm || filterCoach !== 'all' ? 'Try adjusting your filters' : 'Start by assigning players to coaches'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};


