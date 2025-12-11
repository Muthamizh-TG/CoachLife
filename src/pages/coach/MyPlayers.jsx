import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/store';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { Users, Award, TrendingUp, Target, ArrowRight, Zap, Clock, Star, Search, BookOpen, Filter, GridIcon, ListIcon, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const MyPlayers = () => {
  const { currentUser, players, getCoachplayersessions } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  
  const myplayers = players.filter((p) => p.primaryCoach === currentUser.id);
  
  // Get session count for each student
  const getplayersessionCount = (playerId) => {
    return getCoachplayersessions ? getCoachplayersessions(currentUser.id).filter(s => s.playerId === playerId).length : 0;
  };
  
  // Filter players based on search and level
  let filteredplayers = myplayers.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || student.level.toString() === filterLevel;
    return matchesSearch && matchesLevel;
  });

  // Sort players
  filteredplayers = [...filteredplayers].sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'progress':
        return b.progress - a.progress;
      case 'points':
        return b.totalPoints - a.totalPoints;
      case 'level':
        return b.level - a.level;
      default:
        return 0;
    }
  });
  
  // Calculate statistics
  const totalplayers = myplayers.length;
  const avgProgress = totalplayers > 0 ? Math.round(myplayers.reduce((sum, s) => sum + s.progress, 0) / totalplayers) : 0;
  const topStudent = myplayers.length > 0 ? myplayers.reduce((top, student) => student.totalPoints > top.totalPoints ? student : top) : null;
  const totalSessions = myplayers.reduce((sum, s) => sum + getplayersessionCount(s.playerId), 0);
  const avgPointsPerStudent = totalplayers > 0 ? Math.round(myplayers.reduce((sum, s) => sum + s.totalPoints, 0) / totalplayers) : 0;

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
          boxShadow: '0 4px 12px rgba(37, 44, 53, 0.2)',
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
              My Players
            </h1>
            <p style={{
              fontSize: '15px',
              opacity: 0.9,
              margin: 0
            }}>
              Manage and track your player's progress and performance
            </p>
          </div>

          {/* View Mode Buttons */}
          <div style={{
            display: 'flex',
            gap: '10px',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '6px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'grid' ? '#526681' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'grid') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'grid') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <GridIcon size={18} />
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'list' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'list' ? '#526681' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'list') {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'list') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <ListIcon size={18} />
              List
            </button>
          </div>
        </div>

        {/* Statistics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.borderColor = '#E2E8F0';
            e.currentTarget.style.transform = 'translateY(0)';
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
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0, marginBottom: '6px' }}>Total Players</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#252c35', margin: 0 }}>{totalplayers}</p>
          </div>

          {/* Average Progress */}
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
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.borderColor = '#E2E8F0';
            e.currentTarget.style.transform = 'translateY(0)';
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
              <TrendingUp size={24} color="#526681" />
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0, marginBottom: '6px' }}>Avg Progress</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#252c35', margin: 0 }}>{avgProgress}%</p>
          </div>

          {/* Total Sessions */}
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
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.borderColor = '#E2E8F0';
            e.currentTarget.style.transform = 'translateY(0)';
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
              <BookOpen size={24} color="#10B981" />
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0, marginBottom: '6px' }}>Total Sessions</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#252c35', margin: 0 }}>{totalSessions}</p>
          </div>

          {/* Avg Points Per Student */}
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
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.borderColor = '#E2E8F0';
            e.currentTarget.style.transform = 'translateY(0)';
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
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0, marginBottom: '6px' }}>Avg Points/Players</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#252c35', margin: 0 }}>{avgPointsPerStudent}</p>
          </div>
        </div>

        {/* Search, Filter and Sort Controls */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '14px',
          border: '1.5px solid #E2E8F0',
          padding: '20px',
          marginBottom: '32px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {/* Search Box */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#F8FAFC',
              padding: '12px 14px',
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
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '13px',
                  color: '#111827',
                  fontWeight: '500'
                }}
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1.5px solid #E2E8F0',
                background: '#F8FAFC',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#111827',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#526681';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              <option value="name">Sort by Name</option>
              <option value="progress">Sort by Progress</option>
              <option value="points">Sort by Points</option>
              <option value="level">Sort by Level</option>
            </select>

            {/* Level Filter Pills */}
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              overflowX: 'auto',
              paddingBottom: '4px'
            }}>
              <Filter size={18} color="#526681" style={{ flexShrink: 0 }} />
              <button
                onClick={() => setFilterLevel('all')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: filterLevel === 'all' ? '2px solid #526681' : '1.5px solid #E2E8F0',
                  background: filterLevel === 'all' ? '#E8F2F8' : '#FFFFFF',
                  color: filterLevel === 'all' ? '#526681' : '#64748B',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (filterLevel !== 'all') {
                    e.currentTarget.style.borderColor = '#526681';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filterLevel !== 'all') {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }
                }}
              >
                All
              </button>
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  onClick={() => setFilterLevel(level.toString())}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: filterLevel === level.toString() ? '2px solid #526681' : '1.5px solid #E2E8F0',
                    background: filterLevel === level.toString() ? '#FFFBEB' : '#FFFFFF',
                    color: filterLevel === level.toString() ? '#526681' : '#64748B',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '13px',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (filterLevel !== level.toString()) {
                      e.currentTarget.style.borderColor = '#526681';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filterLevel !== level.toString()) {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                    }
                  }}
                >
                  L{level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* players Display */}
        {filteredplayers.length > 0 ? (
          viewMode === 'grid' ? (
            // Grid View
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {filteredplayers.map((student) => (
                <div key={student.playerId} style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  border: '2px solid #E2E8F0',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(82, 102, 129, 0.15)';
                  e.currentTarget.style.borderColor = '#526681';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  {/* Header */}
                  <div style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #F8FAFC, #EFF6FF)',
                    borderBottom: '1.5px solid #E2E8F0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: 0, marginBottom: '4px' }}>{student.name}</h3>
                      <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>{student.email}</p>
                    </div>
                    <ChevronRight size={20} color="#526681" style={{ flexShrink: 0 }} />
                  </div>

                  {/* Badges */}
                  <div style={{ padding: '12px 16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '4px 10px',
                      background: '#E8F2F8',
                      color: '#252c35',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}>
                      Level {student.level}
                    </span>
                    <span style={{
                      padding: '4px 10px',
                      background: '#FFFBEB',
                      color: '#92400E',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}>
                      Stage {student.stage}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div style={{
                    padding: '12px 16px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    borderBottom: '1.5px solid #E2E8F0'
                  }}>
                    <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                      <p style={{ fontSize: '11px', color: '#64748B', margin: 0, marginBottom: '4px', fontWeight: '600' }}>Points</p>
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#526681', margin: 0 }}>{student.totalPoints}</p>
                    </div>
                    <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                      <p style={{ fontSize: '11px', color: '#64748B', margin: 0, marginBottom: '4px', fontWeight: '600' }}>Sessions</p>
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#526681', margin: 0 }}>{getplayersessionCount(student.playerId)}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>Progress</span>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#252c35' }}>{student.progress}%</span>
                    </div>
                    <div style={{
                      height: '8px',
                      background: '#E2E8F0',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #526681, #252c35)',
                        width: `${student.progress}%`,
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ padding: '12px 16px', display: 'flex', gap: '10px', borderTop: '1.5px solid #E2E8F0' }}>
                    <Link 
                      to={`/coach/student/${student.playerId}`}
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #526681, #252c35)',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: '700',
                        transition: 'all 0.2s ease',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.boxShadow = '0 4px 12px rgba(82, 102, 129, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      View Details
                    </Link>
                    <Link 
                      to={`/coach/student/${student.playerId}/sessions`}
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: '#526681',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: '700',
                        transition: 'all 0.2s ease',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.boxShadow = '0 4px 12px rgba(246, 201, 14, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Sessions
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1.5px solid #E2E8F0',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}>
              {/* Header Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 0.8fr',
                gap: '16px',
                padding: '16px 20px',
                background: '#F8FAFC',
                borderBottom: '2px solid #E2E8F0',
                fontWeight: '700',
                fontSize: '12px',
                color: '#64748B',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <div>Name</div>
                <div>Level</div>
                <div>Points</div>
                <div>Sessions</div>
                <div>Progress</div>
                <div>Actions</div>
                <div />
              </div>

              {/* Data Rows */}
              {filteredplayers.map((student, idx) => (
                <div
                  key={student.playerId}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 0.8fr',
                    gap: '16px',
                    padding: '16px 20px',
                    borderBottom: idx < filteredplayers.length - 1 ? '1px solid #E2E8F0' : 'none',
                    alignItems: 'center',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  {/* Name */}
                  <div>
                    <p style={{ fontWeight: '700', color: '#111827', fontSize: '13px', margin: 0 }}>{student.name}</p>
                    <p style={{ fontSize: '11px', color: '#64748B', margin: '4px 0 0 0' }}>{student.email}</p>
                  </div>

                  {/* Level */}
                  <div>
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

                  {/* Points */}
                  <div style={{ fontWeight: '700', color: '#526681', fontSize: '13px' }}>{student.totalPoints}</div>

                  {/* Sessions */}
                  <div style={{ fontWeight: '700', color: '#526681', fontSize: '13px' }}>{getplayersessionCount(student.playerId)}</div>

                  {/* Progress */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        flex: 1,
                        height: '6px',
                        background: '#E2E8F0',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, #526681, #252c35)',
                          width: `${student.progress}%`
                        }} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#111827', minWidth: '35px', textAlign: 'right' }}>{student.progress}%</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link 
                      to={`/coach/student/${student.playerId}`}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: '#526681',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '11px',
                        fontWeight: '700',
                        transition: 'all 0.2s ease',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(82, 102, 129, 0.3)'}
                      onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                    >
                      View
                    </Link>
                    <Link 
                      to={`/coach/student/${student.playerId}/sessions`}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: '#526681',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '11px',
                        fontWeight: '700',
                        transition: 'all 0.2s ease',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(246, 201, 14, 0.3)'}
                      onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                    >
                      Sess
                    </Link>
                  </div>

                  {/* Indicator */}
                  <div style={{ textAlign: 'center' }}>
                    <ChevronRight size={18} color="#E2E8F0" />
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '14px',
            border: '1.5px solid #E2E8F0',
            padding: '48px 32px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            {myplayers.length === 0 ? (
              <>
                <Users size={56} style={{ margin: '0 auto 16px', opacity: 0.3, color: '#D1D5DB' }} />
                <p style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0, marginBottom: '8px' }}>
                  No players assigned yet
                </p>
                <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
                  Players will appear here once they are assigned to you
                </p>
              </>
            ) : (
              <>
                <Search size={56} style={{ margin: '0 auto 16px', opacity: 0.3, color: '#D1D5DB' }} />
                <p style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0, marginBottom: '8px' }}>
                  No players match your search
                </p>
                <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
                  Try adjusting your search or filter criteria
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};


