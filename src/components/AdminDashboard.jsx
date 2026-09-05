import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Download, Trash2, Edit, Plus, Users, FolderKanban, 
  Settings, CheckCircle, Search, ExternalLink, ShieldCheck, RefreshCw 
} from 'lucide-react';
import { storageService } from '../services/storageService';

export default function AdminDashboard({ onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'portfolio'

  // Data states
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  // New project modal state
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Fitness & Wellness',
    industry: 'Fitness / Health',
    description: '',
    tagline: '',
    coverImage: '/assets/projects/kinetic-gym.jpg',
  });

  const loadData = () => {
    setLeads(storageService.getLeads());
    setProjects(storageService.getProjects());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'twisp2026' || passcode === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Use: twisp2026');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = storageService.updateLeadStatus(id, newStatus);
    setLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Are you sure you want to delete this client lead record?')) {
      const updated = storageService.deleteLead(id);
      setLeads(updated);
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(null);
      }
    }
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.description.trim()) {
      alert('Please fill out the project title and description.');
      return;
    }

    storageService.createProject(newProject);
    setProjects(storageService.getProjects());
    setIsAddingProject(false);
    setNewProject({
      title: '',
      category: 'Fitness & Wellness',
      industry: 'Fitness / Health',
      description: '',
      tagline: '',
      coverImage: '/assets/projects/kinetic-gym.jpg',
    });
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Delete this portfolio project?')) {
      const updated = storageService.deleteProject(id);
      setProjects(updated);
    }
  };

  // Metrics
  const metrics = storageService.getLeadMetrics();

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        backgroundColor: 'rgba(3, 19, 14, 0.95)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          height: '92vh',
          backgroundColor: '#06281E',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '24px',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#FFFFFF',
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            padding: '20px 32px',
            backgroundColor: '#041B14',
            borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img
              src="/assets/twisp-logo-white.png"
              alt="TWISP"
              style={{
                height: '28px',
                width: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
            <div style={{ height: '20px', width: '1px', backgroundColor: 'rgba(16, 185, 129, 0.3)' }} />
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                STUDIO ADMIN CRM
              </div>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: '#10B981' }}>
                CLIENT INQUIRIES & CMS
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Admin Dashboard"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {!isAuthenticated ? (
          /* AUTHENTICATION GATE */
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '420px',
                backgroundColor: 'rgba(4, 26, 19, 0.85)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '20px',
                padding: '40px 32px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <Lock size={26} color="#10B981" />
              </div>

              <h2 style={{ fontSize: '1.45rem', fontWeight: 700, marginBottom: '8px' }}>
                Studio Team Authentication
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '24px' }}>
                Enter the internal passkey to access client inquiries, budget allocations, and portfolio CMS.
              </p>

              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  placeholder="Enter passcode (twisp2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#020F0B',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#FFFFFF',
                    fontSize: '0.9375rem',
                    textAlign: 'center',
                    marginBottom: '12px',
                  }}
                  autoFocus
                />

                {authError && (
                  <div style={{ color: '#F87171', fontSize: '0.8125rem', marginBottom: '14px' }}>
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '13px', marginBottom: '12px' }}
                >
                  Unlock CRM Dashboard
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPasscode('twisp2026');
                    setIsAuthenticated(true);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#10B981',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Quick Demo Access (Auto-fill)
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED CRM CONTENT */
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Sidebar Navigation */}
            <div
              style={{
                width: '220px',
                backgroundColor: '#041B14',
                borderRight: '1px solid rgba(16, 185, 129, 0.15)',
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => setActiveTab('leads')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: activeTab === 'leads' ? 'rgba(16, 185, 129, 0.18)' : 'transparent',
                    color: activeTab === 'leads' ? '#10B981' : '#94A3B8',
                    fontWeight: activeTab === 'leads' ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                  }}
                >
                  <Users size={18} />
                  <span>Leads CRM</span>
                </button>

                <button
                  onClick={() => setActiveTab('portfolio')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: activeTab === 'portfolio' ? 'rgba(16, 185, 129, 0.18)' : 'transparent',
                    color: activeTab === 'portfolio' ? '#10B981' : '#94A3B8',
                    fontWeight: activeTab === 'portfolio' ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                  }}
                >
                  <FolderKanban size={18} />
                  <span>Portfolio CMS</span>
                </button>
              </div>

              <div>
                <button
                  onClick={() => storageService.exportLeadsCSV()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    backgroundColor: 'rgba(6, 40, 30, 0.6)',
                    color: '#B8F2D5',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                  }}
                >
                  <Download size={14} />
                  <span>Export Leads CSV</span>
                </button>
              </div>
            </div>

            {/* Main CRM Area */}
            <div style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
              {activeTab === 'leads' ? (
                /* LEADS TAB */
                <div>
                  {/* Metric Summary Cards */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: '14px',
                      marginBottom: '28px',
                    }}
                  >
                    {[
                      { label: 'Total Inquiries', count: metrics.total, color: '#FFFFFF' },
                      { label: 'New', count: metrics.newLeads, color: '#34D399' },
                      { label: 'Contacted', count: metrics.contacted, color: '#60A5FA' },
                      { label: 'Qualified', count: metrics.qualified, color: '#FBBF24' },
                      { label: 'Won', count: metrics.won, color: '#10B981' },
                      { label: 'Lost', count: metrics.lost, color: '#94A3B8' },
                    ].map((m) => (
                      <div
                        key={m.label}
                        style={{
                          backgroundColor: '#041E16',
                          border: '1px solid rgba(16, 185, 129, 0.15)',
                          borderRadius: '12px',
                          padding: '16px',
                        }}
                      >
                        <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{m.label}</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: m.color, marginTop: '4px' }}>
                          {m.count}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Search and Filters */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px',
                      marginBottom: '20px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '360px' }}>
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                        }}
                      >
                        <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                        <input
                          type="text"
                          placeholder="Search client, company or email..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 14px 10px 36px',
                            borderRadius: '8px',
                            backgroundColor: '#041E16',
                            border: '1px solid rgba(16, 185, 129, 0.25)',
                            color: '#FFFFFF',
                            fontSize: '0.875rem',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {['ALL', ...statuses].map((st) => (
                        <button
                          key={st}
                          onClick={() => setStatusFilter(st)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: statusFilter === st ? '#10B981' : '#041E16',
                            color: statusFilter === st ? '#03130E' : '#CBD5E1',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Leads Table */}
                  <div
                    style={{
                      backgroundColor: '#041E16',
                      borderRadius: '14px',
                      border: '1px solid rgba(16, 185, 129, 0.15)',
                      overflowX: 'auto',
                    }}
                  >
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(16, 185, 129, 0.2)', color: '#10B981', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                          <th style={{ padding: '14px 16px' }}>CLIENT / BUSINESS</th>
                          <th style={{ padding: '14px 16px' }}>SERVICE REQUIRED</th>
                          <th style={{ padding: '14px 16px' }}>BUDGET</th>
                          <th style={{ padding: '14px 16px' }}>STATUS</th>
                          <th style={{ padding: '14px 16px' }}>RECEIVED</th>
                          <th style={{ padding: '14px 16px', textAlign: 'right' }}>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map((lead) => (
                          <tr
                            key={lead.id}
                            style={{
                              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                              backgroundColor: selectedLead?.id === lead.id ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                            }}
                          >
                            <td style={{ padding: '14px 16px' }}>
                              <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{lead.name}</div>
                              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{lead.business}</div>
                              <div style={{ fontSize: '0.75rem', color: '#10B981' }}>{lead.email}</div>
                            </td>
                            <td style={{ padding: '14px 16px', color: '#CBD5E1' }}>{lead.service}</td>
                            <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', color: '#A7F3D0' }}>
                              {lead.budget}
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                style={{
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  backgroundColor: '#062E22',
                                  border: '1px solid rgba(16, 185, 129, 0.3)',
                                  color: '#FFFFFF',
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                }}
                              >
                                {statuses.map((st) => (
                                  <option key={st} value={st} style={{ backgroundColor: '#041B14' }}>
                                    {st}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td style={{ padding: '14px 16px', fontSize: '0.75rem', color: '#6B7280' }}>
                              {new Date(lead.date).toLocaleDateString()}
                            </td>
                            <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '8px' }}>
                                <button
                                  onClick={() => setSelectedLead(lead)}
                                  style={{
                                    padding: '5px 10px',
                                    borderRadius: '6px',
                                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                    color: '#B8F2D5',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem',
                                  }}
                                >
                                  Inspect
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  style={{
                                    padding: '5px 8px',
                                    borderRadius: '6px',
                                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: '#F87171',
                                    cursor: 'pointer',
                                  }}
                                  title="Delete Lead"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Selected Lead Detailed Inspection Drawer */}
                  {selectedLead && (
                    <div
                      style={{
                        marginTop: '24px',
                        backgroundColor: '#041B14',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '16px',
                        padding: '24px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                          Lead Details: {selectedLead.name} ({selectedLead.business})
                        </h4>
                        <button
                          onClick={() => setSelectedLead(null)}
                          style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer' }}
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>EMAIL</div>
                          <div style={{ color: '#10B981', fontWeight: 600 }}>{selectedLead.email}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>PHONE</div>
                          <div>{selectedLead.phone || 'Not provided'}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>CURRENT WEBSITE</div>
                          <div>
                            {selectedLead.website ? (
                              <a href={selectedLead.website} target="_blank" rel="noreferrer" style={{ color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {selectedLead.website} <ExternalLink size={12} />
                              </a>
                            ) : (
                              'None'
                            )}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>BUDGET</div>
                          <div style={{ color: '#A7F3D0' }}>{selectedLead.budget}</div>
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '4px' }}>CLIENT MESSAGE / REQUIREMENTS</div>
                        <div style={{ backgroundColor: '#020F0B', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', color: '#CBD5E1', lineHeight: 1.6 }}>
                          {selectedLead.message}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* PORTFOLIO TAB */
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Portfolio Management</h3>
                      <p style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>Manage showcased concept projects and live client works.</p>
                    </div>
                    <button
                      onClick={() => setIsAddingProject(true)}
                      className="btn btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
                    >
                      <Plus size={16} />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  {/* Add project form */}
                  {isAddingProject && (
                    <form
                      onSubmit={handleCreateProject}
                      style={{
                        backgroundColor: '#041B14',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '16px',
                        padding: '24px',
                        marginBottom: '28px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <h4 style={{ fontWeight: 700 }}>Add New Project Showcase</h4>
                        <button type="button" onClick={() => setIsAddingProject(false)} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer' }}>
                          <X size={18} />
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#020F0B', border: '1px solid rgba(16,185,129,0.3)', color: '#FFFFFF' }}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Category (e.g. Real Estate, Restaurant)"
                          value={newProject.category}
                          onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                          style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#020F0B', border: '1px solid rgba(16,185,129,0.3)', color: '#FFFFFF' }}
                        />
                        <input
                          type="text"
                          placeholder="Industry Tag"
                          value={newProject.industry}
                          onChange={(e) => setNewProject({ ...newProject, industry: e.target.value })}
                          style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#020F0B', border: '1px solid rgba(16,185,129,0.3)', color: '#FFFFFF' }}
                        />
                        <input
                          type="text"
                          placeholder="Tagline / Subheading"
                          value={newProject.tagline}
                          onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                          style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#020F0B', border: '1px solid rgba(16,185,129,0.3)', color: '#FFFFFF' }}
                        />
                      </div>

                      <textarea
                        rows={3}
                        placeholder="Short description of the project..."
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#020F0B', border: '1px solid rgba(16,185,129,0.3)', color: '#FFFFFF', marginBottom: '16px' }}
                        required
                      />

                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.875rem' }}>
                          Save Project
                        </button>
                        <button type="button" onClick={() => setIsAddingProject(false)} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Project List */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        style={{
                          backgroundColor: '#041E16',
                          borderRadius: '14px',
                          border: '1px solid rgba(16, 185, 129, 0.2)',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#10B981', fontFamily: 'var(--font-mono)' }}>{proj.category}</div>
                          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '6px 0 10px' }}>{proj.title}</h4>
                          <p style={{ fontSize: '0.8125rem', color: '#94A3B8', lineHeight: 1.5 }}>{proj.description}</p>
                        </div>

                        <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>ID: {proj.id}</span>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer' }}
                            title="Delete Project"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
