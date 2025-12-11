import { useState } from 'react';
import { useStore } from '../../context/store';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { BookOpen, Plus, Trash2, Edit2, Layers, Zap, BarChart3, Search } from 'lucide-react';

export const LearningPathwayBuilder = () => {
  const { learningPathway } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [formData, setFormData] = useState({
    stage: 1,
    level: 1,
    activityName: '',
    programs: '',
    defaultPoints: 10,
  });

  // Calculate stats from actual data
  const totalActivities = learningPathway.length;
  const totalStages = new Set(learningPathway.map(item => item.stage)).size;
  const totalLevels = new Set(learningPathway.map(item => item.level)).size;
  const avgPoints = Math.round(learningPathway.reduce((sum, item) => sum + item.defaultPoints, 0) / totalActivities) || 0;
  const allPrograms = new Set(learningPathway.flatMap(item => item.programs)).size;



  const filteredActivities = learningPathway.filter(activity => {
    const matchesSearch = activity.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.programs.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStage = selectedStage === 'all' || activity.stage === parseInt(selectedStage);
    return matchesSearch && matchesStage;
  });

  const handleAddActivity = () => {
    if (formData.activityName && formData.programs) {
      alert(`Added: ${formData.activityName}`);
      setFormData({ stage: 1, level: 1, activityName: '', programs: '', defaultPoints: 10 });
      setIsModalOpen(false);
      setEditingId(null);
    }
  };

  const handleDeleteClick = (activity) => {
    setSelectedActivity(activity);
    setDeleteModalOpen(true);
  };

  const columns = [
    { key: 'id', label: 'ID', width: '60px' },
    {
      key: 'stage',
      label: 'Stage',
      render: (value) => (
        <div style={{
          display: 'inline-block',
          padding: '6px 12px',
          backgroundColor: '#E8F2F8',
          color: '#252c35',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '700'
        }}>
          Stage {value}
        </div>
      ),
    },
    {
      key: 'level',
      label: 'Level',
      render: (value) => (
        <div style={{
          display: 'inline-block',
          padding: '6px 12px',
          backgroundColor: '#FFFBEB',
          color: '#92400e',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '700'
        }}>
          Level {value}
        </div>
      ),
    },
    {
      key: 'activityName',
      label: 'Activity',
      render: (value) => (
        <span style={{ fontWeight: '600', color: '#111827' }}>{value}</span>
      ),
    },
    {
      key: 'programs',
      label: 'Programs',
      render: (value) => (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {value.map((program, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                padding: '4px 8px',
                backgroundColor: '#F0FDF4',
                color: '#15803d',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '600'
              }}
            >
              {program}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'defaultPoints',
      label: 'Points',
      render: (value) => (
        <div style={{
          display: 'inline-block',
          padding: '6px 12px',
          backgroundColor: '#F0FDF4',
          color: '#15803d',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '700'
        }}>
          {value} pts
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => {}}
            style={{
              padding: '6px 10px',
              background: '#526681',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#252c35'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#526681'}
          >
            <Edit2 size={12} /> Edit
          </button>
          <button
            onClick={() => handleDeleteClick(row)}
            style={{
              padding: '6px 10px',
              background: '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#DC2626'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#EF4444'}
          >
            <Trash2 size={12} /> Delete
          </button>
        </div>
      ),
    },
  ];

  const groupedByStage = learningPathway.reduce((acc, item) => {
    if (!acc[item.stage]) acc[item.stage] = [];
    acc[item.stage].push(item);
    return acc;
  }, {});

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
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Learning Pathway</h1>
            <p style={{ fontSize: '14px', opacity: 0.95, margin: 0 }}>Create and manage learning activities and progression stages</p>
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
            <Layers size={32} />
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
                  <BookOpen size={24} color="#252c35" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Total Activities</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{totalActivities}</p>
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
                  background: '#E8F2F8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Layers size={24} color="#252c35" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Total Stages</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{totalStages}</p>
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
                  <BarChart3 size={24} color="#526681" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Unique Levels</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{totalLevels}</p>
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
                  <Zap size={24} color="#10B981" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Avg Points</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{avgPoints}</p>
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
                  <BookOpen size={24} color="#10B981" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase', margin: 0 }}>Unique Activity</p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>{allPrograms}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '32px',
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
                placeholder="Search activities by name or program..."
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
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
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
              <option value="all">All Stages</option>
              {Object.keys(groupedByStage).map(stage => (
                <option key={stage} value={stage}>
                  Stage {stage}
                </option>
              ))}
            </select>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                padding: '10px 16px',
                background: 'linear-gradient(135deg, #252c35, #526681)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 44, 53, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <Plus size={18} /> Add Activity
            </button>
          </div>

          {/* Activities Table */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            marginBottom: '32px'
          }}>
            {filteredActivities.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <Table columns={columns} data={filteredActivities} />
              </div>
            ) : (
              <div style={{
                padding: '48px 24px',
                textAlign: 'center'
              }}>
                <BookOpen size={48} style={{ color: '#D1D5DB', margin: '0 auto 16px' }} />
                <p style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280', margin: '0' }}>No activities found</p>
                <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '4px 0 0 0' }}>Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Delete Confirmation Modal */}
          {deleteModalOpen && selectedActivity && (
            <div style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '32px',
                maxWidth: '400px',
                width: '90%',
                boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: '#FEF2F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <Trash2 size={28} color="#EF4444" />
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827',
                  textAlign: 'center',
                  margin: '0 0 8px 0'
                }}>
                  Delete Activity?
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  textAlign: 'center',
                  margin: '0 0 24px 0'
                }}>
                  Are you sure you want to delete <strong>"{selectedActivity.activityName}"</strong>? This action cannot be undone.
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px'
                }}>
                  <button
                    onClick={() => setDeleteModalOpen(false)}
                    style={{
                      padding: '10px 16px',
                      border: '2px solid #E2E8F0',
                      backgroundColor: 'white',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#111827',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#D1D5DB';
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setDeleteModalOpen(false)}
                    style={{
                      padding: '10px 16px',
                      background: '#EF4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#DC2626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#EF4444';
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    {/* Modal for Add/Edit Activity */}
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ stage: 1, level: 1, activityName: '', programs: '', defaultPoints: 10 });
      }}
      title={editingId ? 'Edit Activity' : 'Add New Activity'}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px', display: 'block' }}>Stage</label>
            <select
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: Number(e.target.value) })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white',
                color: '#111827',
                cursor: 'pointer'
              }}
            >
              {[1, 2, 3].map((s) => (
                <option key={s} value={s}>
                  Stage {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px', display: 'block' }}>Level</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white',
                color: '#111827',
                cursor: 'pointer'
              }}
            >
              {[1, 2, 3].map((l) => (
                <option key={l} value={l}>
                  Level {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px', display: 'block' }}>Activity Name</label>
          <input
            type="text"
            placeholder="e.g., Python Basics, Web Development"
            value={formData.activityName}
            onChange={(e) => setFormData({ ...formData, activityName: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '2px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#526681'}
            onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
          />
        </div>

        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px', display: 'block' }}>Programs (comma-separated)</label>
          <input
            type="text"
            placeholder="e.g., P1, P2, P3"
            value={formData.programs}
            onChange={(e) => setFormData({ ...formData, programs: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '2px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#526681'}
            onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
          />
        </div>

        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px', display: 'block' }}>Default Points</label>
          <input
            type="number"
            min="0"
            max="1000"
            value={formData.defaultPoints}
            onChange={(e) => setFormData({ ...formData, defaultPoints: Number(e.target.value) })}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '2px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#526681'}
            onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
          <button
            onClick={() => {
              setIsModalOpen(false);
              setEditingId(null);
              setFormData({ stage: 1, level: 1, activityName: '', programs: '', defaultPoints: 10 });
            }}
            style={{
              padding: '10px 16px',
              border: '2px solid #E2E8F0',
              backgroundColor: 'white',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#111827',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#D1D5DB';
              e.currentTarget.style.backgroundColor = '#F9FAFB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleAddActivity}
            style={{
              padding: '10px 16px',
              background: 'linear-gradient(135deg, #10B981, #059669)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
          >
            {editingId ? 'Update Activity' : 'Create Activity'}
          </button>
        </div>
      </div>
    </Modal>
  </Layout>
  );
};


