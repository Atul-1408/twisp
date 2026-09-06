import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Download, Trash2, Edit, Plus, Users, FolderKanban, 
  Settings, CheckCircle, Search, ExternalLink, ShieldCheck, RefreshCw,
  LogOut, Calendar, MessageSquare, Phone, Globe, ArrowUpDown
} from 'lucide-react';
import { leadService } from '../services/leadService';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';
import AdminLogin from './AdminLogin';

export default function AdminDashboard({ onClose }) {
  const [session, setSession] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'portfolio'

  // Data states
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [leadsError, setLeadsError] = useState('');
  const [projects, setProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadNotes, setLeadNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSaveSuccess, setNotesSaveSuccess] = useState(false);

  // New project modal state for portfolio CMS
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Fitness & Wellness',
    industry: 'Fitness / Health',
    description: '',
    tagline: '',
    coverImage: '/assets/projects/kinetic-gym.jpg',
  });

  // Check auth on mount
  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const { data } = await authService.getSession();
        if (mounted) {
          setSession(data?.session || null);
          setIsCheckingAuth(false);
        }
      } catch (err) {
        if (mounted) setIsCheckingAuth(false);
      }
    }

    checkSession();

    const { data: authListener } = authService.onAuthStateChange((_event, newSession) => {
      if (mounted) {
        setSession(newSession);
      }
    });

    return () => {
      mounted = false;
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Fetch data when session is active
  const fetchLeads = async () => {
    setLoadingLeads(true);
    setLeadsError('');
    try {
      const { data, error } = await leadService.getLeads();
      if (error) {
        setLeadsError(error.message || 'Failed to load leads from Supabase.');
      } else {
        setLeads(data || []);
      }
    } catch (err) {
      setLeadsError(err.message || 'Error connecting to database.');
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchLeads();
      setProjects(storageService.getProjects());
    }
  }, [session]);

  // Sync selectedLead notes state
  useEffect(() => {
    if (selectedLead) {
      setLeadNotes(selectedLead.notes || '');
      setNotesSaveSuccess(false);
    }
  }, [selectedLead]);

  const handleLogout = async () => {
    await authService.signOut();
    setSession(null);
    setLeads([]);
    setSelectedLead(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus.toLowerCase() } : l))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => ({ ...prev, status: newStatus.toLowerCase() }));
    }

    try {
      const { error } = await leadService.updateLeadStatus(id, newStatus);
      if (error) {
        console.error('Failed to update status in Supabase:', error);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setIsSavingNotes(true);
    setNotesSaveSuccess(false);

    try {
      const { error } = await leadService.updateLeadNotes(selectedLead.id, leadNotes);
      if (!error) {
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: leadNotes } : l))
        );
        setSelectedLead((prev) => ({ ...prev, notes: leadNotes }));
        setNotesSaveSuccess(true);
        setTimeout(() => setNotesSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error saving notes:', err);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this lead record? This action cannot be undone.')) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(null);
      }

      try {
        const { error } = await leadService.deleteLead(id);
        if (error) {
          console.error('Failed to delete lead from Supabase:', error);
          // Re-fetch to restore state if deletion failed
          fetchLeads();
        }
      } catch (err) {
        console.error('Error deleting lead:', err);
        fetchLeads();
      }
    }
  };

  // Portfolio CMS handlers
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

  // Metrics from real DB leads
  const metrics = leadService.getLeadMetrics(leads);

  // Filter & search
  const filteredLeads = leads
    .filter((l) => {
      const currentStatus = (l.status || 'new').toLowerCase();
      const matchesStatus = statusFilter === 'ALL' || currentStatus === statusFilter.toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        (l.name || '').toLowerCase().includes(q) ||
        (l.company || l.business || '').toLowerCase().includes(q) ||
        (l.email || '').toLowerCase().includes(q) ||
        (l.service || '').toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at || a.date || 0).getTime();
      const dateB = new Date(b.created_at || b.date || 0).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const statuses = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];

  // 1. Loading check
  if (isCheckingAuth) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 3000,
          backgroundColor: 'rgba(2, 15, 11, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#10B981',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <RefreshCw size={28} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  // 2. Unauthenticated: Render AdminLogin
  if (!session) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 3000, overflowY: 'auto' }}>
        <AdminLogin
          onSuccess={(newSession) => setSession(newSession)}
          onBack={onClose}
        />
      </div>
    );
  }

  // 3. Authenticated CRM Interface
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
        padding: '20px',
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          height: '92vh',
          backgroundColor: '#06281E',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '24px',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.85)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#FFFFFF',
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            padding: '18px 28px',
            backgroundColor: '#041B14',
            borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img
              src="/assets/twisp-logo-white.png"
              alt="TWISP"
              style={{
                height: '26px',
                width: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
            <div style={{ height: '20px', width: '1px', backgroundColor: 'rgba(16, 185, 129, 0.3)' }} />
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                STUDIO ADMIN CRM
              </div>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: '#10B981' }}>
                SUPABASE PRODUCTION BACKEND
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Authenticated user pill */}
            <span
              style={{
                fontSize: '0.75rem',
                color: '#A7F3D0',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {session.user?.email || 'admin@twisp.studio'}
            </span>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#FCA5A5',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
              }}
              title="Sign Out"
            >
              <LogOut size={13} />
              <span>LOGOUT</span>
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              aria-label="Close Admin Dashboard"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '8px',
                color: '#FFFFFF',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Authenticated Content */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar Navigation */}
          <div
            style={{
              width: '210px',
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={fetchLeads}
                disabled={loadingLeads}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: '100%',
                  padding: '9px',
                  borderRadius: '8px',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  backgroundColor: 'rgba(6, 40, 30, 0.6)',
                  color: '#B8F2D5',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                }}
              >
                <RefreshCw size={13} className={loadingLeads ? 'spin' : ''} />
                <span>Refresh Leads</span>
              </button>

              <button
                onClick={() => leadService.exportLeadsCSV(filteredLeads.length ? filteredLeads : leads)}
                disabled={!leads.length}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '9px',
                  borderRadius: '8px',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  backgroundColor: 'rgba(6, 40, 30, 0.6)',
                  color: '#B8F2D5',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: leads.length ? 'pointer' : 'not-allowed',
                  opacity: leads.length ? 1 : 0.5,
                }}
              >
                <Download size={14} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
            {activeTab === 'leads' ? (
              /* LEADS CRM TAB */
              <div>
                {/* Metric Summary Cards */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '14px',
                    marginBottom: '28px',
                  }}
                >
                  {[
                    { label: 'Total Inquiries', count: metrics.total, color: '#FFFFFF' },
                    { label: 'New', count: metrics.newLeads, color: '#34D399' },
                    { label: 'Contacted', count: metrics.contacted, color: '#60A5FA' },
                    { label: 'Qualified', count: metrics.qualified, color: '#FBBF24' },
                    { label: 'Proposal Sent', count: metrics.proposal, color: '#A78BFA' },
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
                      <div style={{ fontSize: '0.725rem', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>
                        {m.label.toUpperCase()}
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: m.color, marginTop: '4px' }}>
                        {m.count}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Error banner if Supabase query failed */}
                {leadsError && (
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#FCA5A5',
                      fontSize: '0.875rem',
                      marginBottom: '20px',
                    }}
                  >
                    <strong>Database Notice:</strong> {leadsError}
                  </div>
                )}

                {/* Search, Filter, Sort Controls */}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '400px' }}>
                    <div style={{ position: 'relative', width: '100%' }}>
                      <Search size={15} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                      <input
                        type="text"
                        placeholder="Search name, company, email, service..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px 9px 34px',
                          borderRadius: '8px',
                          backgroundColor: '#041E16',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          color: '#FFFFFF',
                          fontSize: '0.85rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {/* Status pills */}
                    {['ALL', ...statuses].map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: statusFilter.toLowerCase() === st.toLowerCase() ? '#10B981' : '#041E16',
                          color: statusFilter.toLowerCase() === st.toLowerCase() ? '#03130E' : '#CBD5E1',
                          fontSize: '0.725rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {st}
                      </button>
                    ))}

                    {/* Sort button */}
                    <button
                      onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        backgroundColor: '#041E16',
                        color: '#B8F2D5',
                        fontSize: '0.725rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'var(--font-mono)',
                      }}
                      title="Toggle Date Sorting"
                    >
                      <ArrowUpDown size={12} />
                      <span>{sortOrder === 'newest' ? 'NEWEST' : 'OLDEST'}</span>
                    </button>
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
                      <tr style={{ borderBottom: '1px solid rgba(16, 185, 129, 0.2)', color: '#10B981', fontFamily: 'var(--font-mono)', fontSize: '0.725rem' }}>
                        <th style={{ padding: '14px 16px' }}>CLIENT / COMPANY</th>
                        <th style={{ padding: '14px 16px' }}>SERVICE</th>
                        <th style={{ padding: '14px 16px' }}>BUDGET</th>
                        <th style={{ padding: '14px 16px' }}>TIMELINE</th>
                        <th style={{ padding: '14px 16px' }}>STATUS</th>
                        <th style={{ padding: '14px 16px' }}>SUBMITTED</th>
                        <th style={{ padding: '14px 16px', textAlign: 'right' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ padding: '48px 16px', textAlign: 'center', color: '#94A3B8' }}>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#E2E8F0', marginBottom: '6px' }}>
                              {loadingLeads ? 'Loading real leads from Supabase...' : 'No leads yet.'}
                            </div>
                            <div style={{ fontSize: '0.85rem' }}>
                              {loadingLeads ? 'Connecting to PostgreSQL...' : 'New project inquiries will appear here.'}
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => {
                          const currentStatus = (lead.status || 'new').toLowerCase();
                          return (
                            <tr
                              key={lead.id}
                              style={{
                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                backgroundColor: selectedLead?.id === lead.id ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                              }}
                            >
                              <td style={{ padding: '14px 16px' }}>
                                <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{lead.name}</div>
                                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{lead.company || lead.business || 'Undisclosed Client'}</div>
                                <div style={{ fontSize: '0.75rem', color: '#10B981' }}>{lead.email}</div>
                              </td>
                              <td style={{ padding: '14px 16px', color: '#CBD5E1' }}>{lead.service}</td>
                              <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', color: '#A7F3D0', fontSize: '0.8rem' }}>
                                {lead.budget}
                              </td>
                              <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: '#CBD5E1' }}>
                                {lead.timeline || 'Flexible'}
                              </td>
                              <td style={{ padding: '14px 16px' }}>
                                <select
                                  value={currentStatus}
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
                                    textTransform: 'capitalize',
                                  }}
                                >
                                  {statuses.map((st) => (
                                    <option key={st} value={st} style={{ backgroundColor: '#041B14' }}>
                                      {st.charAt(0).toUpperCase() + st.slice(1)}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td style={{ padding: '14px 16px', fontSize: '0.75rem', color: '#6B7280', whiteSpace: 'nowrap' }}>
                                {new Date(lead.created_at || lead.date || Date.now()).toLocaleDateString()}
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
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Selected Lead Detailed Inspection Drawer */}
                {selectedLead && (
                  <div
                    style={{
                      marginTop: '24px',
                      backgroundColor: '#041B14',
                      border: '1px solid rgba(16, 185, 129, 0.35)',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                          Lead Details: {selectedLead.name}
                        </h4>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                            color: '#10B981',
                            fontFamily: 'var(--font-mono)',
                            textTransform: 'uppercase',
                          }}
                        >
                          {selectedLead.status || 'new'}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedLead(null)}
                        style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer' }}
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                      <div>
                        <div style={{ fontSize: '0.725rem', color: '#6B7280', fontFamily: 'var(--font-mono)' }}>COMPANY / BUSINESS</div>
                        <div style={{ color: '#FFFFFF', fontWeight: 600 }}>{selectedLead.company || selectedLead.business || 'Not specified'}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.725rem', color: '#6B7280', fontFamily: 'var(--font-mono)' }}>DIRECT EMAIL</div>
                        <div style={{ color: '#10B981', fontWeight: 600 }}>
                          <a href={`mailto:${selectedLead.email}`} style={{ color: '#10B981' }}>{selectedLead.email}</a>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.725rem', color: '#6B7280', fontFamily: 'var(--font-mono)' }}>PHONE NUMBER</div>
                        <div>{selectedLead.phone || 'Not provided'}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.725rem', color: '#6B7280', fontFamily: 'var(--font-mono)' }}>CURRENT WEBSITE</div>
                        <div>
                          {selectedLead.website ? (
                            <a href={selectedLead.website} target="_blank" rel="noreferrer" style={{ color: '#60A5FA', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <span>{selectedLead.website}</span>
                              <ExternalLink size={12} />
                            </a>
                          ) : (
                            'None'
                          )}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.725rem', color: '#6B7280', fontFamily: 'var(--font-mono)' }}>REQUESTED SERVICE</div>
                        <div style={{ color: '#FFFFFF' }}>{selectedLead.service}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.725rem', color: '#6B7280', fontFamily: 'var(--font-mono)' }}>BUDGET TIER</div>
                        <div style={{ color: '#A7F3D0', fontWeight: 600 }}>{selectedLead.budget}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.725rem', color: '#6B7280', fontFamily: 'var(--font-mono)' }}>TIMELINE</div>
                        <div>{selectedLead.timeline || 'Flexible'}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.725rem', color: '#6B7280', fontFamily: 'var(--font-mono)' }}>SUBMISSION DATE</div>
                        <div>{new Date(selectedLead.created_at || selectedLead.date || Date.now()).toLocaleString()}</div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '0.725rem', color: '#6B7280', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                        CLIENT PROJECT MESSAGE / GOALS
                      </div>
                      <div
                        style={{
                          backgroundColor: '#020F0B',
                          padding: '16px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: '#CBD5E1',
                          lineHeight: 1.6,
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {selectedLead.message}
                      </div>
                    </div>

                    {/* Editable Internal Notes */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label
                          htmlFor="lead-notes"
                          style={{ fontSize: '0.725rem', color: '#10B981', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}
                        >
                          INTERNAL STUDIO NOTES (PRIVATE)
                        </label>
                        {notesSaveSuccess && (
                          <span style={{ fontSize: '0.75rem', color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle size={12} />
                            <span>Saved to Supabase!</span>
                          </span>
                        )}
                      </div>
                      <textarea
                        id="lead-notes"
                        rows={3}
                        placeholder="Add internal notes about client meeting, proposal progress, or follow-ups..."
                        value={leadNotes}
                        onChange={(e) => setLeadNotes(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '8px',
                          backgroundColor: '#020F0B',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          color: '#FFFFFF',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          outline: 'none',
                          marginBottom: '10px',
                        }}
                      />
                      <button
                        onClick={handleSaveNotes}
                        disabled={isSavingNotes}
                        className="btn btn-primary"
                        style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                      >
                        {isSavingNotes ? 'Saving...' : 'Save Internal Notes'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* PORTFOLIO CMS TAB */
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

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
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
      </div>
    </div>
  );
}
