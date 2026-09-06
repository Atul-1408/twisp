import { supabase } from './supabaseClient.js';

export const leadService = {
  /**
   * Submit a new lead inquiry from the quote/contact form.
   * Calls the serverless /api/leads endpoint first; falls back to direct Supabase insertion.
   */
  submitLead: async (leadData) => {
    // 1. Client-side payload preparation
    const payload = {
      name: leadData.name?.trim() || '',
      email: leadData.email?.trim() || '',
      phone: leadData.phone?.trim() || '',
      company: leadData.company?.trim() || leadData.business?.trim() || '',
      website: leadData.website?.trim() || '',
      service: leadData.service || 'Website Design & Build',
      budget: leadData.budget || '$1,000–$2,500',
      timeline: leadData.timeline || '',
      message: leadData.message?.trim() || '',
      honeypot: leadData.honeypot || '',
      source: 'website',
    };

    // 2. Try POST /api/leads
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      }

      // If serverless endpoint returned a 4xx/5xx with error JSON
      const errData = await response.json().catch(() => null);
      if (errData && errData.message) {
        throw new Error(errData.message);
      }
    } catch (apiError) {
      console.warn('API endpoint unavailable or failed, attempting direct Supabase fallback:', apiError);

      // 3. Fallback: direct Supabase insert if client is configured and RLS permits
      if (supabase && !payload.honeypot) {
        const { data, error } = await supabase
          .from('leads')
          .insert([
            {
              name: payload.name,
              email: payload.email,
              phone: payload.phone,
              company: payload.company,
              website: payload.website,
              service: payload.service,
              budget: payload.budget,
              timeline: payload.timeline,
              message: payload.message,
              source: payload.source,
              status: 'new',
            },
          ])
          .select()
          .single();

        if (error) {
          console.error('Supabase direct insert error:', error);
          throw new Error('Unable to submit your request. Please check your connection and try again.');
        }

        return {
          success: true,
          message: 'Your request has been received.',
          data,
        };
      }

      // If neither API nor Supabase succeeded
      throw new Error(apiError.message || 'Unable to submit your request. Please try again.');
    }
  },

  /**
   * Fetch all real leads from Supabase (Requires authenticated admin session).
   */
  getLeads: async () => {
    if (!supabase) {
      return { data: [], error: new Error('Supabase is not configured.') };
    }

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    return { data: data || [], error };
  },

  /**
   * Update lead status in Supabase
   */
  updateLeadStatus: async (id, status) => {
    if (!supabase) return { error: new Error('Supabase is not configured.') };

    const { data, error } = await supabase
      .from('leads')
      .update({ status: status.toLowerCase() })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  /**
   * Update internal admin notes for a lead
   */
  updateLeadNotes: async (id, notes) => {
    if (!supabase) return { error: new Error('Supabase is not configured.') };

    const { data, error } = await supabase
      .from('leads')
      .update({ notes })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  /**
   * Delete a lead permanently from Supabase
   */
  deleteLead: async (id) => {
    if (!supabase) return { error: new Error('Supabase is not configured.') };

    const { error } = await supabase.from('leads').delete().eq('id', id);
    return { error };
  },

  /**
   * Calculate live metrics from leads array
   */
  getLeadMetrics: (leads = []) => {
    const list = Array.isArray(leads) ? leads : [];
    return {
      total: list.length,
      newLeads: list.filter((l) => (l.status || '').toLowerCase() === 'new').length,
      contacted: list.filter((l) => (l.status || '').toLowerCase() === 'contacted').length,
      qualified: list.filter((l) => (l.status || '').toLowerCase() === 'qualified').length,
      proposal: list.filter((l) => (l.status || '').toLowerCase() === 'proposal').length,
      won: list.filter((l) => (l.status || '').toLowerCase() === 'won').length,
      lost: list.filter((l) => (l.status || '').toLowerCase() === 'lost').length,
    };
  },

  /**
   * Export lead records to a clean CSV file
   */
  exportLeadsCSV: (leads = []) => {
    if (!leads.length) return;

    const headers = [
      'ID',
      'Created Date',
      'Name',
      'Company',
      'Email',
      'Phone',
      'Website',
      'Service',
      'Budget',
      'Timeline',
      'Status',
      'Message',
      'Internal Notes',
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${new Date(l.created_at).toISOString()}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.company || l.business || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.website || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      `"${(l.timeline || '').replace(/"/g, '""')}"`,
      `"${(l.status || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `twisp-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
