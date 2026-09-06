import React, { useState } from 'react';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { authService } from '../services/authService';

export default function AdminLogin({ onSuccess, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isConfigured = authService.isConfigured();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await authService.signIn(email, password);

      if (authError) {
        setError(authError.message || 'Invalid email or password.');
      } else if (data?.session) {
        if (onSuccess) onSuccess(data.session);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while signing in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#020F0B',
        backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.12) 0%, rgba(2, 15, 11, 1) 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#FFFFFF',
      }}
    >
      {/* Back to website button */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '32px',
            left: '32px',
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-mono)',
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#10B981')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
        >
          <ArrowLeft size={16} />
          <span>BACK TO WEBSITE</span>
        </button>
      )}

      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#041E16',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '24px',
          padding: '44px 36px',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(20px)',
          textAlign: 'center',
        }}
      >
        {/* Studio Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
          <img
            src="/assets/twisp-logo-white.png"
            alt="TWISP"
            style={{ height: '30px', width: 'auto', display: 'block' }}
          />
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: 'var(--twisp-emerald-400)',
              padding: '2px 8px',
              borderRadius: '4px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            STUDIO
          </span>
        </div>

        <div
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <Lock size={22} color="#10B981" />
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Studio Admin Access
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '28px', lineHeight: 1.5 }}>
          Log in with your authorized studio administrator credentials to manage client inquiries and lead pipelines.
        </p>

        {/* Configuration Warning if env vars not set */}
        {!isConfigured && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              backgroundColor: 'rgba(234, 179, 8, 0.1)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              color: '#FDE047',
              fontSize: '0.78rem',
              textAlign: 'left',
              lineHeight: 1.4,
              marginBottom: '20px',
            }}
          >
            <strong>Supabase Setup Required:</strong> Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your environment file to connect authentication.
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#FCA5A5',
              fontSize: '0.8125rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
              textAlign: 'left',
            }}
          >
            <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          {/* Email Input */}
          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="admin-email"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: '#B8F2D5',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Admin Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                color="#64748B"
                style={{ position: 'absolute', left: '14px', top: '14px', pointerEvents: 'none' }}
              />
              <input
                id="admin-email"
                type="email"
                placeholder="admin@twisp.studio"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  backgroundColor: '#020F0B',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.9375rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '24px' }}>
            <label
              htmlFor="admin-password"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: '#B8F2D5',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                color="#64748B"
                style={{ position: 'absolute', left: '14px', top: '14px', pointerEvents: 'none' }}
              />
              <input
                id="admin-password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  backgroundColor: '#020F0B',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.9375rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '0.9375rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div
          style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '0.75rem',
            color: '#6B7280',
          }}
        >
          <ShieldCheck size={14} color="#10B981" />
          <span>Encrypted Supabase PostgreSQL & Auth Connection</span>
        </div>
      </div>
    </div>
  );
}
