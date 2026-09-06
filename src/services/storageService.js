import { INITIAL_LEADS, INITIAL_PROJECTS, INITIAL_SERVICES } from '../data/initialData';

const LEADS_STORAGE_KEY = 'twisp_studio_leads_v1';
const PROJECTS_STORAGE_KEY = 'twisp_studio_projects_v2';
const SERVICES_STORAGE_KEY = 'twisp_studio_services_v1';

export const storageService = {
  // --- LEADS MANAGEMENT ---
  getLeads: () => {
    try {
      const stored = localStorage.getItem(LEADS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
        return INITIAL_LEADS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.warn('LocalStorage error reading leads, using memory defaults', e);
      return INITIAL_LEADS;
    }
  },

  createLead: (leadInput) => {
    const leads = storageService.getLeads();
    const newLead = {
      id: `lead-${Date.now().toString().slice(-5)}`,
      name: leadInput.name.trim(),
      business: leadInput.business?.trim() || 'Undisclosed Studio / Client',
      email: leadInput.email.trim(),
      phone: leadInput.phone?.trim() || '',
      website: leadInput.website?.trim() || '',
      service: leadInput.service || 'Web Design & Development',
      budget: leadInput.budget || '$1,000–$2,500',
      message: leadInput.message.trim(),
      date: new Date().toISOString(),
      status: 'New'
    };

    const updated = [newLead, ...leads];
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save lead to localStorage', e);
    }
    return newLead;
  },

  updateLeadStatus: (id, status) => {
    const leads = storageService.getLeads();
    const updated = leads.map(lead => (lead.id === id ? { ...lead, status } : lead));
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update lead status', e);
    }
    return updated;
  },

  deleteLead: (id) => {
    const leads = storageService.getLeads();
    const updated = leads.filter(lead => lead.id !== id);
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete lead', e);
    }
    return updated;
  },

  exportLeadsCSV: () => {
    const leads = storageService.getLeads();
    const headers = ['ID', 'Date', 'Name', 'Business', 'Email', 'Phone', 'Website', 'Service', 'Budget', 'Status', 'Message'];
    
    const rows = leads.map(l => [
      `"${l.id}"`,
      `"${new Date(l.date).toLocaleDateString()}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.business || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.website || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      `"${(l.status || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `twisp-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  getLeadMetrics: () => {
    const leads = storageService.getLeads();
    return {
      total: leads.length,
      newLeads: leads.filter(l => l.status === 'New').length,
      contacted: leads.filter(l => l.status === 'Contacted').length,
      qualified: leads.filter(l => l.status === 'Qualified').length,
      won: leads.filter(l => l.status === 'Won').length,
      lost: leads.filter(l => l.status === 'Lost').length
    };
  },

  // --- PORTFOLIO MANAGEMENT ---
  getProjects: () => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
        return INITIAL_PROJECTS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.warn('LocalStorage error reading projects', e);
      return INITIAL_PROJECTS;
    }
  },

  createProject: (projectInput) => {
    const projects = storageService.getProjects();
    const newProject = {
      id: `proj-${Date.now()}`,
      number: `0${projects.length + 1}`,
      title: projectInput.title.trim(),
      category: projectInput.category || 'Digital Experience',
      tagline: projectInput.tagline || 'Custom Web Experience',
      description: projectInput.description.trim(),
      industry: projectInput.industry || 'General Business',
      year: new Date().getFullYear().toString(),
      deliverables: projectInput.deliverables?.length ? projectInput.deliverables : ['UI/UX Design', 'Web Development'],
      technologies: projectInput.technologies?.length ? projectInput.technologies : ['React', 'CSS Architecture'],
      coverImage: projectInput.coverImage || '/assets/projects/generic-project.png',
      liveUrl: projectInput.liveUrl || '#',
      challenge: projectInput.challenge || 'Design and build a scalable online presence.',
      solution: projectInput.solution || 'Implemented a bespoke digital product with modern performance standards.',
      metrics: projectInput.metrics || [{ label: 'Performance', value: '98/100' }],
      features: projectInput.features || ['Responsive design', 'Accessible layout', 'Fast loading times']
    };
    const updated = [...projects, newProject];
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save project', e);
    }
    return newProject;
  },

  updateProject: (id, projectUpdates) => {
    const projects = storageService.getProjects();
    const updated = projects.map(p => (p.id === id ? { ...p, ...projectUpdates } : p));
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update project', e);
    }
    return updated;
  },

  deleteProject: (id) => {
    const projects = storageService.getProjects();
    const updated = projects.filter(p => p.id !== id);
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete project', e);
    }
    return updated;
  },

  // --- SERVICES MANAGEMENT ---
  getServices: () => {
    try {
      const stored = localStorage.getItem(SERVICES_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(INITIAL_SERVICES));
        return INITIAL_SERVICES;
      }
      return JSON.parse(stored);
    } catch (e) {
      return INITIAL_SERVICES;
    }
  }
};
