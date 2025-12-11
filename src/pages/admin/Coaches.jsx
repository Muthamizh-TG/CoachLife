import { useState } from 'react';
import { useStore } from '../../context/store';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Users, Plus, Search, Edit3, Trash2, BarChart3, Award, TrendingUp, BookOpen, AlertCircle } from 'lucide-react';

export const Coaches = () => {
  const { coaches, addCoach, updateCoach, deleteCoach } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
  });

  const filteredCoaches = coaches.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: coaches.length,
    active: coaches.filter(c => c.assignedPlayers && c.assignedPlayers.length > 0).length,
    inactive: coaches.filter(c => !c.assignedPlayers || c.assignedPlayers.length === 0).length,
    avgplayersPerCoach: coaches.length > 0 ? (coaches.reduce((sum, c) => sum + (c.assignedPlayers?.length || 0), 0) / coaches.length).toFixed(1) : 0,
  };

  const handleAddCoach = () => {
    if (formData.name && formData.email) {
      addCoach({
        ...formData,
        assignedPlayers: [],
        totalSessions: 0,
        rating: 0,
        joinDate: new Date().toISOString().split('T')[0],
      });
      setFormData({ name: '', email: '', specialization: '' });
      setIsModalOpen(false);
    }
  };

  const columns = [
    { 
      key: 'coachId', 
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
      key: 'specialization', 
      label: 'Specialization',
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
          {value}
        </span>
      )
    },
    {
      key: 'assignedPlayers',
      label: 'players',
      render: (value) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Users size={16} color="#526681" />
          <span style={{ fontWeight: '700', color: '#526681', fontSize: '14px' }}>{value.length}</span>
        </div>
      ),
    },
    {
      key: 'totalSessions',
      label: 'Sessions',
      render: (value) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <BookOpen size={16} color="#10B981" />
          <span style={{ fontWeight: '700', color: '#10B981', fontSize: '14px' }}>{value}</span>
        </div>
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (value) => {
        const rating = value || 0;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 10px',
              backgroundColor: '#FEF3C7',
              borderRadius: '20px',
              fontWeight: '600',
              fontSize: '13px',
              color: '#D97706'
            }}>
              {rating.toFixed(1)}/5
            </span>
            <span>{'⭐'.repeat(Math.round(rating))}</span>
          </div>
        );
      },
    },
  ];

  return (
    <Layout>
      <div className="admin-page-container">
        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>Coaches Management</h1>
              <p style={{ fontSize: '14px', color: '#666', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} /> Manage {stats.total} coach{stats.total !== 1 ? 'es' : ''}, monitor performance, and track players
              </p>
            </div>
            <button
              onClick={() => {
                setFormData({ name: '', email: '', specialization: '' });
                setIsModalOpen(true);
              }}
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
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 44, 53, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 44, 53, 0.3)';
              }}
            >
              <Plus size={18} /> Add New Coach
            </button>
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
                <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase' }}>Total Coaches</p>
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
                background: '#F0FDF4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUp size={24} color="#10B981" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase' }}>Active Coaches</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>{stats.active}</p>
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
                <AlertCircle size={24} color="#EF4444" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase' }}>Inactive Coaches</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>{stats.inactive}</p>
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
                <Award size={24} color="#526681" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', textTransform: 'uppercase' }}>Avg players/Coach</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>{stats.avgplayersPerCoach}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
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
              placeholder="Search by name, email, or specialization..."
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
                {filteredCoaches.length}
              </span>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#666', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: '500' }}>Showing</span>
          <span style={{ fontWeight: '600', color: '#111827' }}>{filteredCoaches.length}</span>
          <span>of</span>
          <span style={{ fontWeight: '600', color: '#111827' }}>{coaches.length}</span>
          <span>coaches</span>
        </div>

        {/* Table Card */}
        <Card className="card-elevated" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', borderRadius: '12px', overflow: 'hidden' }}>
          {filteredCoaches.length > 0 ? (
            <Table
              columns={columns}
              data={filteredCoaches}
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
                    onClick={() => setDeleteConfirm(row.coachId)}
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
              <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>No coaches found</p>
              <p style={{ fontSize: '13px', color: '#bbb' }}>
                {searchTerm ? 'Try adjusting your search criteria' : 'Start by adding your first coach'}
              </p>
            </div>
          )}
        </Card>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <Modal
            isOpen={!!deleteConfirm}
            onClose={() => setDeleteConfirm(null)}
            title="Delete Coach"
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
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>Delete this coach?</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
                This action cannot be undone. The coach and all associated data will be permanently deleted.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
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
                </button>
                <button
                  onClick={() => {
                    deleteCoach(deleteConfirm);
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
                </button>
              </div>
            </div>
          </Modal>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Coach"
        >
          <div style={{ padding: '24px' }}>
            {/* Form Header */}
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>
              Fill in the details below to create a new coach account. All fields are required.
            </p>

            {/* Name Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                Coach Name
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="coach@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Specialization Field */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                Specialization
              </label>
              <input
                type="text"
                placeholder="e.g., Python & Web Development"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Form Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                onClick={() => setIsModalOpen(false)}
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
              </button>
              <button
                onClick={handleAddCoach}
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
                Create Coach
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};


